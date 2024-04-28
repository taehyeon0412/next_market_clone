"use server";

import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";

export async function saveMessage(payload: string, chatRoomId: string) {
  const session = await getSession();
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!,
    },
    select: { id: true },
  });
}
