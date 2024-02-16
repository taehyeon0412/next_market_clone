import Layout from "@/app/_components/layout";
import { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="채팅">
      <div className="py-10 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex px-4 cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className=" text-gray-700">Steve Jobs</p>
              <p className="text-sm font-medium text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </div>
        ))}
        {/* 프로필 */}
      </div>
    </Layout>
  );
};

export default Chats;
