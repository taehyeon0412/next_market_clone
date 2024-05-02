"use server";

import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";

export async function HeartItem(itemId: number) {
  const session = await getSession();
  console.log("Session ID:", session.id);

  try {
    await db.heart.create({
      data: {
        itemId,
        userId: session.id!,
      },
    });

    revalidateTag(`heart-status-${itemId}`);
  } catch (e) {}
}

export async function noHeartItem(itemId: number) {
  const session = await getSession();

  try {
    await db.heart.delete({
      where: {
        id: {
          itemId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`heart-status-${itemId}`);
  } catch (e) {}
}
//하트 버튼 로직
