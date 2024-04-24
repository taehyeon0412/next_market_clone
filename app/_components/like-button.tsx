"use client";

import { useOptimistic } from "react";
import { dislikePost, likePost } from "../(tabs)/community/[id]/like-action";
import { startTransition } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked, //실제 반환될 값은 이전의 isLiked의 반대값이 되어야됨
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      };
    }
  );
  //첫번째는 action이 실행되기전에 유저가 봐야되는 데이터 = state
  //두번째는 데이터를 수정하는 reducer

  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    console.log(state.isLiked);
    console.log(state.likeCount);

    if (state.isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  //onClick을 실행하면 reducerFn이 먼저 실행되고 ui가 업데이트됨
  //그 후에 백엔드가 action을 실행함
  //사용자는 백엔드의 action 완료와 상관없이 빠른 ui를 볼 수 있게 됨

  return (
    <button
      onClick={onClick}
      className="flex space-x-2 items-center text-sm cursor-pointer"
    >
      <svg
        className={`w-4 h-4 ${
          state.isLiked
            ? "bg-orange-500 border-orange-500 text-white rounded-full"
            : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <span className={`${state.isLiked ? "  text-orange-500 " : ""}`}>
        궁금해요 {state.likeCount}
      </span>
    </button>
  );
}

/* 
useOptimistic 
-비동기 action이 진행되는 동안 다른 상태를 표시할 수 있는 React Hook

-백엔드에서 action을 완료하는데 시간이 걸리더라도 유저한테는 
즉시 결과를 보여줄 수 있게 하는 것
*/
