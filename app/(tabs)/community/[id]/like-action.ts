"use server";

import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";

export async function likePost(postId: number) {
  const session = await getSession();
  console.log("Session ID:", session.id);

  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });

    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

export async function dislikePost(postId: number) {
  const session = await getSession();

  try {
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}
//좋아요 버튼 로직
