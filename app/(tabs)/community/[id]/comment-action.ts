"use server";

import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function deleteComment(commentId: number, userId: number) {
  const session = await getSession();
  console.log("Session ID:", session.id);

  try {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new Error("User is not authorized to delete this comment");
    }

    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (e) {}
}

export async function createComment(
  postId: number,
  userId: number,
  payload: string
) {
  const result = await db.comment.create({
    data: {
      payload,
      postId: postId,
      userId: userId,
    },
    select: { id: true },
  });

  return result;
}

const commentSchema = z.object({
  payload: z
    .string({ required_error: "댓글을 입력해 주세요." })
    .trim()
    .min(1, "한글자 이상 작성해 주세요.")
    .max(100, "100글자 이하로 작성해 주세요."),
});

export async function uploadComment(formData: FormData, postId: number) {
  const data = {
    payload: formData.get("payload"),
  };

  const result = commentSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.comment.create({
        data: {
          payload: result.data.payload,
          postId: postId,
          userId: session.id,
        },
        select: {
          id: true,
        },
      });
    }
  }
}
