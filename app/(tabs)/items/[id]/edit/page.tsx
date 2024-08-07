"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout-bar";
import TextArea from "@/app/_components/textarea";
import React, { useRef, useState } from "react";
import { MB } from "@/app/_libs/_client/utils";
import updateItem from "./action";
import { notFound } from "next/navigation";

export default function ItemEdit({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isNaN(id)) {
    return notFound();
  }

  const isOversizeImage = (file: File): boolean => {
    if (file.size > 5 * MB) {
      alert("파일 크기가 5MB를 초과했습니다.");
      return true;
    }
    return false;
  };
  //파일 크기 검사

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    // 이벤트에서 파일 목록을 가져옴

    if (!files) {
      return;
    }
    const file = files[0];
    // 파일 목록에서 첫 번째 파일을 가져옴

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    // 파일 타입 검사

    if (isOversizeImage(file)) {
      return;
    }

    const url = URL.createObjectURL(file);
    //파일을 임시 URL로 만들어줌
    setPreview(url);
  };
  //사진 추가 로직

  const removeImage = () => {
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  //이미지 미리보기 삭제 로직

  const handleFormData = async (formData: FormData) => {
    try {
      await updateItem({ params: { id: id.toString() } }, formData);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <Layout canGoBack />
      <form action={handleFormData} className="relative px-4 pt-4 mb-5 h-full">
        <div>
          <label
            className="w-full text-gray-600 hover:cursor-pointer hover:border-orange-500 hover:text-orange-500 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-60 sm:h-96  rounded-md bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${preview})` }}
          >
            {preview === "" ? (
              <>
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>사진을 추가해주세요.</span>
                {/* {state?.fieldErrors.photo} */}
              </>
            ) : null}

            <input
              onChange={onImageChange}
              name="photo"
              className="hidden z-30"
              type="file"
              accept="image/*"
              required
            />
            {/* label로 input을 감싸고 hidden으로 input을 감춰주면 이쁜 input이 된다 */}
          </label>

          {preview === "" ? null : (
            <button
              onClick={removeImage}
              className="z-40 absolute top-4 right-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6 bg-black rounded-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          )}
        </div>

        <Input
          required
          label="제목"
          name="title"
          type="text"
          placeholder="제목"
          /* errors={state?.fieldErrors.title}  */
        />
        <Input
          required
          label="가격"
          name="price"
          placeholder="가격을 입력해주세요."
          type="number"
          kind="price"
          /* errors={state?.fieldErrors.price} */
        />

        <div className="mt-5 pb-20 block text-sm font-medium">
          <TextArea
            required
            name="description"
            label="자세한 설명"
            labelName="textArea"
            /* errors={state?.fieldErrors.description} */
          />
        </div>

        <div className="fixed py-2 px-4 bottom-0 mx-auto left-0 right-0 max-w-lg z-50 bg-white border border-white">
          <Button text="작성 완료" type="upload" />
        </div>
      </form>
    </>
  );
}
