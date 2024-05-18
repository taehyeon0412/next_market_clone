"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { notFound, redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const communitySchema = z.object({
  title: z.string({
    required_error: "설명을 입력해주세요.",
  }),
  description: z.string({
    required_error: "설명을 입력해주세요.",
  }),
});

export async function updateCommunity(
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
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const result = communitySchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const community = await db.post.update({
        where: {
          id,
        },
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
      revalidateTag("post-detail");
      redirect(`/community/${community.id}`);
    }
  }

  console.log(result);
}
