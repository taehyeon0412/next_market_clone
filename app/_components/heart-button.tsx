"use client";

import { startTransition, useOptimistic } from "react";
import { HeartItem, noHeartItem } from "../(tabs)/items/[id]/heart-action";

interface HeartButtonProps {
  isHearted: boolean;
  heartCount: number;
  itemId: number;
}

export default function HeartButton({
  isHearted,
  heartCount,
  itemId,
}: HeartButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isHearted, heartCount },
    (previousState, payload) => {
      return {
        isHearted: !previousState.isHearted, //실제 반환될 값은 이전의 isLiked의 반대값이 되어야됨
        heartCount: previousState.isHearted
          ? previousState.heartCount - 1
          : previousState.heartCount + 1,
      };
    }
  );
  //첫번째는 action이 실행되기전에 유저가 봐야되는 데이터 = state
  //두번째는 데이터를 수정하는 reducer

  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    console.log(state.isHearted);
    console.log(state.heartCount);

    if (state.isHearted) {
      await noHeartItem(itemId);
    } else {
      await HeartItem(itemId);
    }
  };
  //onClick을 실행하면 reducerFn이 먼저 실행되고 ui가 업데이트됨
  //그 후에 백엔드가 action을 실행함
  //사용자는 백엔드의 action 완료와 상관없이 빠른 ui를 볼 수 있게 됨
  return (
    <button
      onClick={onClick}
      className="px-3 flex flex-col rounded-md items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
    >
      {state.isHearted ? (
        <svg
          className="h-6 w-6 "
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          stroke="red"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 "
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
      <span className="text-sm">{heartCount}</span>
    </button>
  );
}
