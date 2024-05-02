import Layout from "@/app/_components/layout-bar";
import { NextPage } from "next";

export default async function Bought() {
  return (
    <>
      <Layout canGoBack title="구매 내역" />
      <div className="flex flex-col space-y-5 pb-10"></div>
    </>
  );
}
