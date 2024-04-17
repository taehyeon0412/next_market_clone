import Layout from "@/app/_components/layout-bar";
import Message from "@/app/_components/message";
import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <>
      <Layout canGoBack />
      <div className="py-10 px-4 space-y-4">
        <Message message="Hi how much are you selling them for?" />
        <Message message="I want ￦20,000" reversed />
        <Message message="미쳤어" />

        <div className="fixed w-full mx-auto max-w-md bottom-2 left-0 right-0 inset-x-0">
          <div className="relative flex items-center">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDetail;
