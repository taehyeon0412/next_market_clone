"use server";

import db from "@/app/_libs/_server/db";

export async function getMoreItems(page: number) {
  const items = await db.item.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
    //아이템 정렬
  });
  return items;
}
