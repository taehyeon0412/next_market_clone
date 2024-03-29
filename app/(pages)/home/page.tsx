import type { NextPage } from "next";
import Layout from "../../_components/layout";
import FloatingButton from "../../_components/floating-button";
import Item from "../../_components/item";

const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5">
        {[...Array(10)].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="iPhone"
            price={99}
            comments={1}
            hearts={1}
          />
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
};

export default Home;
