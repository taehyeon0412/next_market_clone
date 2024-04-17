"use client";
//useFormState를 사용하기 때문에 적어야됨
//useState,useEffect 등 마찬가지

import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout-bar";
import Link from "next/link";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  error: undefined,
};
//action.ts의 초기값(prevState)로 들어가는 값

export default function CreateAccount() {
  const [state, action] = useFormState(smsLogin, initialState);

  return (
    <>
      <Layout canGoBack />
      <div className="px-4 py-4">
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">SMS로 가입하기</h1>
            <h2 className="text-sm font-semibold">
              휴대폰 번호를 입력해 주세요.
            </h2>
          </div>

          <form action={action}>
            <div className="flex flex-col">
              {state?.token ? (
                <Input
                  label=""
                  name="token"
                  type="number"
                  placeholder="인증번호"
                  required
                  min={100000}
                  max={999999}
                  errors={state.error?.formErrors}
                />
              ) : (
                <Input
                  label=""
                  name="phone"
                  type="text"
                  kind="phone"
                  placeholder="휴대폰 번호"
                  required
                  errors={state.error?.formErrors}
                />
              )}
            </div>

            <Button text={state.token ? "인증번호 확인" : "인증번호 보내기"} />
          </form>
        </div>

        <div className="bg-white w-full max-w-lg mx-auto px-5 py-4 border-b flex items-center" />
      </div>
    </>
  );
}
