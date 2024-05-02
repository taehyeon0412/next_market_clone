import Layout from "@/app/_components/layout-bar";
import { NextPage } from "next";

export default async function Bought() {
  return (
    <>
      <Layout canGoBack title="구매 내역" />
      <div className="flex flex-col w-full space-y-3 pb-10 justify-center min-h-[90vh]">
        <span className="pt-10 font-semibold text-center">
          구매 내역이 없어요.
        </span>
        <span className="font-semibold text-center">
          동네 이웃과 따뜻한 거래를 해보세요!
        </span>
      </div>
    </>
  );
}
