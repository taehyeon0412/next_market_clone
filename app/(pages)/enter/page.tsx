"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import { cls } from "@/app/_libs/_client/utils";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";

interface EnterForm {
  email?: string;
  phone?: string;
}

export default function Enter() {
  const { register, handleSubmit, watch, reset } = useForm<EnterForm>();
  const [method, setMethod] = useState<"email" | "phone">("email");

  const onEmailClick = () => {
    reset(); //탭바꾸면 input reset
    setMethod("email");
  };

  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  const onValid = (data: EnterForm) => {
    fetch("/api/users/auth", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  /* console.log(watch()); */

  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">당근 마켓</h3>

      <div className="mt-8">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-gray-500 font-medium">입장하기 :</h5>
          <div className="grid grid-cols-2 gap-16 mt-8  w-full pb-4 ">
            <button
              className={cls(
                "pb-4 font-medium border-b-2",
                method === "email"
                  ? " border-orange-500 text-orange-400"
                  : "border-transparent text-gray-500"
              )}
              onClick={onEmailClick}
            >
              이메일
            </button>
            <button
              className={cls(
                "pb-4 font-medium border-b-2",
                method === "phone"
                  ? " border-orange-500 text-orange-400"
                  : "border-transparent text-gray-500"
              )}
              onClick={onPhoneClick}
            >
              휴대폰
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
          <div className="mt-1">
            {method === "email" ? (
              <Input
                register={register("email", {
                  required: true,
                })} //Input에는 ...rest로 받게 해놔서 어떤 props든 가능함
                name="email"
                label="이메일 주소"
                type="email"
              />
            ) : null}

            {method === "phone" ? (
              <Input
                register={register("phone", {
                  required: true,
                })}
                name="phone"
                label="휴대전화 번호"
                type="number"
                kind="phone"
              />
            ) : null}
          </div>

          {method === "email" ? <Button text={"로그인 링크 보내기"} /> : null}
          {method === "phone" ? (
            <Button text={"일회용 비밀번호 가져오기"} />
          ) : null}
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            {/* 중간 라인 선 */}
            <div className="relative -top-3 text-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                다른 입장 방법
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <button className="flex justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
                </g>
              </svg>
            </button>

            <button className="flex justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
