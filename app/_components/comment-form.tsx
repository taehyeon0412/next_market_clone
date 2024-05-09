"use client";

import { useFormState } from "react-dom";
import TextArea from "./textarea";
import { uploadComment } from "../(tabs)/community/[id]/comment-action";
import { useOptimistic, useState } from "react";
import { formatToTimeAgo } from "../_libs/_client/utils";
import Image from "next/image";

interface CommentsProps {
  payload: string;
  id: number;
  created_at: Date;
  userId: number;
  user: {
    username: string;
    avatar: string | null;
  };
}

export default function CommentForm({
  id,
  sessionId,
  comments,
  user,
}: {
  id: number;
  sessionId: number;
  comments: CommentsProps[];
  user: { username: string; avatar: string | null };
}) {
  const [optimisticState, reducerFn] = useOptimistic(
    comments,
    (previousComments, payload: CommentsProps) => [...previousComments, payload]
  );
  const [value, setValue] = useState("");

  //여기서 server action을 intercept해서 필요한 작업 수행
  //formData이용해서 newComment 생성
  const interceptAction = async (_: any, formData: FormData) => {
    //formData 이용해서 newComment 생성
    const newComment = {
      payload: formData.get("comment")?.toString()!,
      id,
      created_at: new Date(),
      userId: sessionId,
      user: {
        username: "optimistic",
        avatar: null,
      },
    };

    //optimistic
    reducerFn(newComment);
    formData.append("postId", id + "");
    console.log("함수실행");

    const result = await uploadComment(_, formData);
    setValue("");

    return result;
  };

  //useFormState
  const [_, action] = useFormState(interceptAction, null);

  //버튼 클릭
  const onClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        {optimisticState.map((comment) => (
          <div key={comment.id} className="px-4">
            <div className="flex items-start space-x-3 border-b mb-2">
              <Image
                src={`${user.avatar}`}
                alt="profile image"
                className="rounded-full w-8 h-8 bg-cover"
                width={64}
                height={64}
              />

              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {user.username}
                </span>
                <span className="text-xs text-gray-500 block">
                  {formatToTimeAgo(comment.created_at.toString())}
                </span>
                <p className="text-gray-700 my-2">{comment.payload}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form action={action} className="my-5">
        <TextArea
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          name="comment"
          required
          placeholder="질문에 답변해 보세요!"
        />

        <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          댓글 입력 하기
        </button>
      </form>
    </div>
  );
}
