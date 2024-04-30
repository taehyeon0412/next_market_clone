import Layout from "@/app/_components/layout-bar";
import TextArea from "@/app/_components/textarea";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "./../../../_components/like-button";
import { CommentBox } from "@/app/_components/comment-box";
import CommentForm from "@/app/_components/comment-form";
import DeleteModal from "@/app/_components/delete-modal";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
    //db에 있는 userId와 upload한 userId가 같다면 해당사용자는 true
  }
  return false; //나머지는 false
}
//upload한 post의 user를 찾는 함수

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
  revalidate: 1,
});

async function getLikeStatus(postId: number) {
  const session = await getSession();
  if (!session || !session.id) {
    console.error("Session or session ID is not valid.");
    return { likeCount: 0, isLiked: false };
  }

  const isLikedData = await db.like.findMany({
    where: {
      postId,
      userId: session.id,
    },
  });
  //로그인한 유저가 생성한 like를 찾는 함수

  const isLiked = isLikedData.some((data) => data.userId === session.id);

  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  //postId를 가진 post에서 생성된 like 개수를 알려주는 함수

  return {
    likeCount,
    isLiked,
  };
}
//like 카운팅, 유저가 생성한 like 찾는 함수

/* function getCachedLikeStatus(postId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["item-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId);
} */
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

  const { likeCount, isLiked } = await getLikeStatus(id);

  const isOwner = await getIsOwner(post.userId);

  return (
    <>
      <Layout canGoBack />
      <div className="px-4">
        <span className="inline-flex my-2.5 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
          동네질문
        </span>

        <div className="flex mb-3 px-4 py-3  border-b items-center justify-between space-x-3">
          <div className="flex items-center gap-4 ">
            <div className="w-10 h-10 rounded-full bg-slate-300">
              {post.user.avatar ? (
                <Image
                  src={post.user.avatar}
                  alt="profile image"
                  className="rounded-full w-10 h-10 bg-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-300"></div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {post.user.username}
              </p>
            </div>
          </div>
          {/* 프로필 정보 */}

          {isOwner ? <DeleteModal Id={post.id} menu="post" /> : null}
        </div>

        <div>
          <div className="mt-2 text-gray-700">
            <div className="*:break-words sm:max-w-[470px] max-w-[320px]">
              <span className="text-orange-500 font-medium">Q.</span>
              <span className="pl-2 font-medium ">{post.title}</span>
            </div>
            <div className="px-6 py-4 border-2 mt-4 rounded-xl">
              <p className="break-words sm:max-w-[450px] max-w-[300px]">
                {post.description}
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
            <div className="flex space-x-5 items-center">
              <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />

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
          <CommentBox postId={params.id} />
        </div>

        <CommentForm postId={id} />
      </div>
    </>
  );
}
