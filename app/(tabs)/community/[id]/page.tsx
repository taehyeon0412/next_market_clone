import Layout from "@/app/_components/layout-bar";
import TextArea from "@/app/_components/textarea";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "./../../../_components/like-button";
import { dislikePost, likePost } from "./action";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}
/*update에 필요한 세가지  
1. 업데이트할 record가 무엇인지를 나타내는 where
2. 어떻게 업데이트를 할지 나타내는 data
3. 업데이트할 post를 찾지 못하면 에러를 발생시키므로 try catch 구문으로 써줌
*/

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 10,
});

async function getLikeStatus(postId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });
  //로그인한 유저가 생성한 like를 찾는 함수

  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  //postId를 가진 post에서 생성된 like 개수를 알려주는 함수

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}
//like 카운팅, 유저가 생성한 like 찾는 함수

function getCachedLikeStatus(postId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["item-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId);
}
//캐시 태그를 하는 이유 :
//특정 태그의 캐시만 재검증을 하여 서버와의 응답시간을 단축 시킬 수 있음

export default async function CommunityPostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);

  if (!post) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <>
      <Layout canGoBack />
      <div>
        <span className="inline-flex my-2.5 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
          동네질문
        </span>

        <div className="flex mb-3 px-4 cursor-pointer py-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300">
            <Image
              src={post.user.avatar!}
              alt="profileImg"
              className="rounded-full w-10 h-10 bg-cover"
              width={64}
              height={64}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {post.user.username}
            </p>
          </div>
        </div>

        <div>
          <div className="mt-2 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span>
            <span className="pl-2 font-medium">{post.title}</span>
          </div>

          <div className="flex justify-between mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
            <div className="flex space-x-5 items-center">
              <form action={isLiked ? dislikePost : likePost}>
                <LikeButton
                  isLiked={isLiked}
                  likeCount={likeCount}
                  postId={id}
                />
              </form>
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
        </div>

        <div className="px-4 my-5 space-y-5">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />

            <div>
              <span className="text-sm block font-medium text-gray-700">
                Steve Jobs
              </span>
              <span className="text-xs text-gray-500 block">2시간 전</span>
              <p className="text-gray-700 mt-2">
                The best mandu restaurant is the one next to my house.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4">
          <TextArea
            name="description"
            required
            placeholder="질문에 답변해 보세요!"
          />

          <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
            댓글 입력 하기
          </button>
        </div>
      </div>
    </>
  );
}
