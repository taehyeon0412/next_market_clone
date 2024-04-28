import Layout from "@/app/_components/layout-bar";
import React from "react";

export default function Loading() {
  return (
    <>
      <Layout hasTabBar title="채팅" />
      <div className="pb-10 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex px-4 cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-700" />
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-700 h-4 w-20" />
              <div className="bg-neutral-700 h-3 w-64" />
            </div>
          </div>
        ))}
        {/* 프로필 */}
      </div>
    </>
  );
}
