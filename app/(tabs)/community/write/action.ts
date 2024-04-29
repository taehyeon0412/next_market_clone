"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";

const communitySchema = z.object({
  title: z.string({
    required_error: "설명을 입력해주세요.",
  }),
  description: z.string({
    required_error: "설명을 입력해주세요.",
  }),
});

export async function uploadCommunity(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const result = communitySchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.post.create({
        data: {
          title: result.data.title,
          description: result.data.description,

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
      redirect(`/community`);
    }
  }

  console.log(result);
}
