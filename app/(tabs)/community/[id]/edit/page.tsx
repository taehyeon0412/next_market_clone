"use client";
import Button from "@/app/_components/button";
import Layout from "@/app/_components/layout-bar";
import TextArea from "@/app/_components/textarea";
import { useFormState } from "react-dom";
import Input from "@/app/_components/input";
import { updateCommunity } from "./action";
import { notFound } from "next/navigation";

export default async function Write({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const handleFormData = async (formData: FormData) => {
    try {
      await updateCommunity({ params: { id: id.toString() } }, formData);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <Layout canGoBack />
      <form action={handleFormData} className="px-4 pb-10">
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

        <Button text="수정하기"></Button>
      </form>
    </>
  );
}
