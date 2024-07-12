"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import AWS from "aws-sdk";
import sharp from "sharp";

//AWS 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // .env.local에서 설정한 리전 값 사용
});

const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketName) {
  throw new Error("AWS_BUCKET_NAME is not defined");
}

const itemSchema = z.object({
  photo: z.string({
    required_error: "사진을 업로드해 주세요.",
  }),
  title: z.string({
    required_error: "제목을 입력해주세요.",
  }),
  description: z.string({
    required_error: "설명을 입력해주세요.",
  }),
  price: z.coerce.number({
    required_error: "가격을 입력해주세요.",
  }),
});

export default async function updateItem(
  {
    params,
  }: {
    params: { id: string };
  },
  formData: FormData
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();

    // Sharp를 사용하여 이미지 최적화
    const optimizedPhoto = await sharp(Buffer.from(photoData))
      .webp({ quality: 95 }) // WebP 형식으로 변환 및 압축 품질 설정
      .toBuffer();

    const imgName = `${Date.now()}-${data.photo.name.split(".")[0]}.webp`;
    //Sharp를 사용하여 webp형식으로 바꿨으니 파일명도 webp 형식으로 바꿔줌

    const params = {
      Bucket: bucketName!, // bucketName이 undefined가 아님을 명시적으로 알림
      Key: imgName, // 고유한 파일 이름 생성
      Body: optimizedPhoto,
      ContentType: "image/webp",
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      data.photo = uploadResult.Location;
    } catch (error) {
      console.error("Failed at this point:", error);
    }
  }

  // 수정을 하면 기존 이미지는 삭제되고 새로운 이미지는 업로드되어야 함

  const result = itemSchema.safeParse(data);

  if (!result.success) {
    console.log("Validation failed:", result.error.flatten());
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (session.id) {
      const item = await db.item.update({
        where: { id },
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      revalidateTag("home-detail");
      redirect(`/items/${item.id}`);
    }
  }
}
