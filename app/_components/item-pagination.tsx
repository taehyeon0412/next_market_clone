"use client";

import { useEffect, useRef, useState } from "react";
import { initialItems } from "../(pages)/home/page";
import ListItem from "./list-item";
import { getMoreItems } from "../(pages)/home/action";

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
    <div className="flex flex-col space-y-5">
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}

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
