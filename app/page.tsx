"use client";

import Link from "next/link";
import Button from "./_components/button";
import "@/app/_libs/_server/db";
import CartCat from "@/public/asset/cartCat.png";
import Image from "next/image";

export default function InitHome() {
  return (
    <div className="px-5 py-3 flex flex-col items-center justify-between w-full max-w-lg mx-auto min-h-screen">
      <div className="my-auto flex flex-col items-center gap-2">
        <Image src={CartCat} alt="CartCat" />

        <h1 className="text-2xl font-semibold pt-10">중고 거래 플랫폼</h1>
        <h2 className="text-base font-medium">
          중고 거래를 쉽고 간편하게 해보세요!
        </h2>
      </div>

      <div className="w-full">
        <Link href="/create-account">
          <Button text="시작하기" />
        </Link>

        <div className="flex gap-2 justify-center items-center mt-2 mb-4">
          <span className="text-sm text-gray-600">이미 계정이 있나요?</span>
          <Link href="/enter">
            <span className="text-sm font-semibold text-orange-500">
              로그인
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
