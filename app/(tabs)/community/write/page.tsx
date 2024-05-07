"use client";
import Button from "@/app/_components/button";
import Layout from "@/app/_components/layout-bar";
import TextArea from "@/app/_components/textarea";
import { useFormState } from "react-dom";
import { uploadCommunity } from "./action";
import Input from "@/app/_components/input";

export default function Write() {
  const [state, action] = useFormState(uploadCommunity, null);

  return (
    <>
      <Layout canGoBack />
      <form action={action} className="px-4 pb-10">
        <Input
          name="title"
          label=""
          placeholder="제목을 입력하세요!"
          required
        />
        <TextArea
          required
          name="description"
          placeholder="질문을 입력해 보세요!"
        />

        <Button text="질문하기"></Button>
      </form>
    </>
  );
}
