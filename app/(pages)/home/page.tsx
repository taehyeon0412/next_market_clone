import type { NextPage } from "next";
import Layout from "../../_components/layout";
import FloatingButton from "../../_components/floating-button";
import Item from "../../_components/item";

async function getItems() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function Home() {
  const items = await getItems();

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5">
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
