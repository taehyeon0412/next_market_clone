import Layout from "@/app/_components/layout-bar";

export default function Loading() {
  return (
    <>
      <Layout title="커뮤니티" hasTabBar />
      <div className="p-5 animate-pulse flex flex-col gap-5 pb-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="px-4 flex flex-col items-start cursor-pointer"
          >
            <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-700 h-5 w-20"></div>

            <div className="mt-2 bg-neutral-700 h-5 w-96"></div>

            <div className="mt-5 flex w-full items-center justify-between text-gray-500 font-medium text-xs">
              <div className="bg-neutral-700 h-5 w-10"></div>
              <div className="bg-neutral-700 h-5 w-10"></div>
            </div>

            <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>

                <div className="bg-neutral-700 h-5 w-10"></div>
              </span>

              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <div className="bg-neutral-700 h-5 w-10"></div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
