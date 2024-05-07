import FloatingButton from "@/app/_components/floating-button";
import Layout from "@/app/_components/layout-bar";
import { formatToTimeAgo } from "@/app/_libs/_client/utils";
import db from "@/app/_libs/_server/db";
import Link from "next/link";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,

      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        }, //_count는 post를 가리키는 요소의 개수를 카운팅 해줌
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return posts;
}
//db 백엔드 연결

export const dynamic = "force-dynamic";

export default async function Community() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <>
      <Layout hasTabBar title="동네생활" />
      <div className="space-y-8 pb-20">
        {posts.map((post) => (
          <Link
            href={`/community/${post.id}`}
            key={post.id}
            className="px-4 flex flex-col items-start cursor-pointer"
          >
            <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
              동네질문
            </span>

            <div className="mt-2 text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] sm:max-w-[450px]">
              <span className="text-orange-500 font-medium">Q.</span>
              <span className="pl-2 font-medium">{post.title}</span>
            </div>

            <div className="mt-5 flex w-full items-center justify-between text-gray-500 font-medium text-xs">
              <span>{post.user.username}</span>
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
            </div>

            <div className="flex justify-between mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
              <div className="flex space-x-5">
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

                  <span>궁금해요 {post._count.likes}</span>
                </span>
                {/* 좋아요 수 */}

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
                  <span>답변 {post._count.comments}</span>
                </span>
                {/* 코멘트 수 */}
              </div>

              <div>
                <span className="text-sm">조회수 {post.views}</span>
              </div>
            </div>
          </Link>
        ))}

        <FloatingButton href="community/write">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </>
  );
}
