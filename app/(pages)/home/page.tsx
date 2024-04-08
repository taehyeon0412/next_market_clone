import type { NextPage } from "next";
import Layout from "../../_components/layout";
import FloatingButton from "../../_components/floating-button";
import db from "@/app/_libs/_server/db";
import ListItem from "@/app/_components/list-item";

async function getItems() {
  const items = await db.item.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return items;
}

export default async function Home() {
  const items = await getItems();

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5">
        {items.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}

        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
}
