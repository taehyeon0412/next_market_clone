"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";

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

export async function uploadItem(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    //지정한 경로에 업로드한 파일을 저장함, 클라우드로 대체가능
    data.photo = `/${data.photo.name}`;
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
      redirect(`/items/${item.id}`);
    }
  }

  console.log(result);
}