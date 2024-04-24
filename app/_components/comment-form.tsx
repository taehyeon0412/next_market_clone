"use client";

import { useFormState } from "react-dom";
import TextArea from "./textarea";
import { uploadComment } from "../(tabs)/community/[id]/comment-action";
import { useState } from "react";

interface commentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: commentFormProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await uploadComment(formData, postId);
    //submit 될 때 formData,postId를 comment-action으로 전달함

    console.log(commentText);
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <TextArea
        value={commentText}
        onChange={(e: any) => setCommentText(e.target.value)}
        name="payload"
        required
        placeholder="질문에 답변해 보세요!"
      />

      <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
        댓글 입력 하기
      </button>
    </form>
  );
}
