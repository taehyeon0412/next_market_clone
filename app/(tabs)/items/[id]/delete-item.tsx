"use server";

import client from "@/app/_libs/_server/client";
import getSession from "@/app/_libs/_server/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

export default async function DeleteItem(itemId: number) {
  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    return false;
  }

  const deleted = await client.item.delete({
    where: {
      id: itemId,
      userId,
    },
  });

  revalidateTag("home-detail");

  if (!deleted) {
    return false;
  }

  return true;
}
