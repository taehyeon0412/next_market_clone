"use server";

import client from "@/app/_libs/_server/client";
import getSession from "@/app/_libs/_server/session";

export default async function DeletePost(postId: number) {
  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    return false;
  }

  const deleted = await client.post.delete({
    where: {
      id: postId,
      userId,
    },
  });

  if (!deleted) {
    return false;
  }

  return true;
}
