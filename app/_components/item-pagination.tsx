"use client";

import { useState } from "react";
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

  const onMoreItems = async () => {
    setIsLoading(true);
    const newItems = await getMoreItems(page + 1); //action.ts 함수 실행

    if (newItems.length !== 0) {
      setPage((prev) => prev + 1); //보여줄 상품이 있을 경우에만 page+1을 실행
      setItems((prev) => [...prev, ...newItems]); //이전+새로운 해서 array 생성
    } else {
      setIsLastPage(true);
    }

    setIsLoading(false);
  };
  //button onclick action

  return (
    <div className="flex flex-col space-y-5">
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}

      {isLastPage ? null : (
        <button
          onClick={onMoreItems}
          disabled={isLoading}
          className="text-white text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "더보기"}
        </button>
      )}
    </div>
  );
}
