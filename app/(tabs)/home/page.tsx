import Layout from "../../_components/layout-bar";
import FloatingButton from "../../_components/floating-button";
import db from "@/app/_libs/_server/db";
import ItemPagination from "@/app/_components/item-pagination";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

/*const getCachedItems = nextCache(getInitialItems, ["home-items"]);

nextCache의 인수 
1.비용이 많이드는 계산이나 db query를 가동시키는 함수
2.keyParts = 함수가 리턴하는 데이터를 cache안에서 식별할 수 있게 해줌
  */

async function getInitialItems() {
  console.log("hit");

  const items = await db.item.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 8,
    orderBy: {
      created_at: "desc",
    },
    //아이템 정렬
  });
  return items;
}
//처음 시작시 나오는 아이템들 이후에는 action.ts에 페이지네이션으로 추가함

export type initialItems = Prisma.PromiseReturnType<typeof getInitialItems>;
//프리즈마에게 이 함수가 리턴할 type가 무엇인지 알려달라고 함
//수동으로 전부 안바꿔줘도 알아서 자동화 되게 만들 수 있음

export const dynamic = "force-dynamic";
//이페이지가 빌드할 때 next.js에게 dynamic-page라고 설명해줌

export default async function Home() {
  const initialItems = await getInitialItems();

  return (
    <>
      <Layout hasTabBar title="홈" />
      <div className="flex flex-col space-y-5">
        <ItemPagination initialItems={initialItems} />

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
    </>
  );
}

/*
페이지네이션 
1.db의 첫번째 아이템만 보여주도록 함  /(home)
2.getInitialItems의 결과를 가져와서 client component로 보냄 /(item-pagination.tsx)
3.client component에서 useState()를 이용해 initialItems로 초기화 시켜줌 /(item-pagination.tsx)
4.client component에서 버튼과 로딩 state를 만들어 주고 버튼에 onclick 함수를 만들어줌 /(item-pagination.tsx)
5.onclick 함수에 들어가는 db로직은 action.ts에 따로 만듦(use server를 해야되기 때문) => 기존의 db에 있는 정보를 가져오되 skip으로 이전에 있던 값은 skip함 /action.ts
6.onclick을 함수에 이전 items[]과 새로운 items[]를 합쳐 새로운 items[]를 만들게 해줌 /(item-pagination.tsx)
*/

/* 무한 스크롤 페이지네이션
1. button => span으로 교체
2. useRef()를 만들고 span에 연결해준다
3. useEffect 내부에 intersectionObserver를 만들고 
   trigger = useRef()를 observe(관찰)하게 한다
*/
