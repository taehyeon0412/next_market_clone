"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout";
import TextArea from "@/app/_components/textarea";
import { useState } from "react";

export default function Upload() {
  const [preview, setPreview] = useState("");
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

    const url = URL.createObjectURL(file);
    //파일을 임시 URL로 만들어줌
    setPreview(url);
  };
  //사진 추가 로직

  return (
    <Layout canGoBack>
      <div className="px-4 pt-4 mb-5 h-full">
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
              </>
            ) : null}

            <input onChange={onImageChange} className="hidden" type="file" />
            {/* label로 input을 감싸고 hidden으로 input을 감춰주면 이쁜 input이 된다 */}
          </label>
        </div>

        <Input
          required
          label="제목"
          name="name"
          type="text"
          placeholder="제목"
        />
        <Input
          required
          label="가격"
          name="price"
          placeholder="가격을 입력해주세요."
          type="text"
          kind="price"
        />

        <div className="mt-5 mb-1 block text-sm font-medium">
          <TextArea name="description" label="자세한 설명" />
        </div>

        <Button text="작성 완료" />
      </div>
    </Layout>
  );
}
