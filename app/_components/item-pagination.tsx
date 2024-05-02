"use client";

import { useEffect, useRef, useState } from "react";
import { initialItems } from "../(tabs)/home/page";
import ListItem from "./list-item";
import { getMoreItems } from "../(tabs)/home/action";
import { usePathname } from "next/navigation";
import { cls } from "./../_libs/_client/utils";

//홈 화면 아이템 리스트 페이지네이션

interface ItemPaginationProps {
  initialItems: initialItems;
}

export default function ItemPagination({ initialItems }: ItemPaginationProps) {
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const currentItemId = pathname.split("/").pop();
  //split("/")=> /기호를 기준으로 URL을 나눔 / pop=>URL의 가장 마지막 요소를 가져옴

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);

          const newItems = await getMoreItems(page + 1); //action.ts 함수 실행

          if (newItems.length !== 0) {
            setPage((prev) => prev + 1); //보여줄 상품이 있을 경우에만 page+1을 실행
            setItems((prev) => [...prev, ...newItems]); //이전+새로운 해서 array 생성
          } else {
            setIsLastPage(true);
          }

          setIsLoading(false);
        }
      },
      {
        threshold: 0.5, //trigger가 몇 퍼센트 표시될 때까지 기다리는 것
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
      //observer가 실행되고 난뒤에는 연결을 끊어줌
    };
  }, [page]);
  //무한스크롤 함수

  return (
    <div
      className={cls(
        "pb-12 z-0",
        pathname === "/home"
          ? "flex flex-col space-y-5"
          : /^\/items\/.+/.test(pathname)
            ? "grid grid-cols-2 gap-4"
            : ""
      )}
    >
      {pathname === "/home"
        ? items.map((item) => <ListItem key={item.id} {...item} />)
        : /^\/items\/.+/.test(pathname)
          ? items
              .filter((item) => currentItemId !== item.id.toString())
              .map((item) => <ListItem key={item.id} {...item} />)
          : null}
      {/* 무한페이지네이션 아이템 리스트 
          필터는 내가 보고있는 아이템이 다른상품 리스트에 안나오게 하기위해서 함
      */}

      {!isLastPage ? (
        <span
          ref={trigger}
          className="text-white text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "더보기"}
        </span>
      ) : null}
    </div>
  );
}
