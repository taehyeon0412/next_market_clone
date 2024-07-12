"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";
import AWS from "aws-sdk";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

//sharp 모듈을 로드
//실패하면(예: 환경에서 모듈을 사용할 수 없는 경우) 오류를 기록하고 대체 메커니즘을 계속 사용
let sharp: typeof import("sharp") | undefined;
try {
  sharp = require("sharp");
} catch (error) {
  console.error("로드 실패 sharp module:", error);
}

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

//zod 설정
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

/* function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} */

export async function uploadItem(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  /* if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    //지정한 경로에 업로드한 파일을 저장함, 클라우드로 대체가능
    data.photo = `/${data.photo.name}`;
  } */

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();

    let optimizedPhoto: Buffer;

    // Sharp를 사용하여 이미지 최적화
    if (sharp) {
      optimizedPhoto = await sharp(Buffer.from(photoData))
        .webp({ quality: 95 }) // WebP 형식으로 변환 및 압축 품질 설정
        .toBuffer();
    } else {
      optimizedPhoto = Buffer.from(photoData);
    }

    const imgName = `${Date.now()}-${data.photo.name.split(".")[0]}.webp`;
    //Sharp를 사용하여 webp형식으로 바꿨으니 파일명도 webp 형식으로 바꿔줌

    const params = {
      Bucket: bucketName!, // bucketName이 undefined가 아님을 명시적으로 알림
      Key: imgName, // 고유한 파일 이름 생성
      Body: optimizedPhoto,
      ContentType: "image/webp",
    };

    try {
      /* await delay(5000); //pending 테스트 */

      const uploadResult = await s3.upload(params).promise();
      data.photo = uploadResult.Location;
    } catch (error) {
      console.error("실패지점:", error);
    }
  }

  const result = itemSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const item = await db.item.create({
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

  console.log(result);
}
