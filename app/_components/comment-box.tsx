import { notFound } from "next/navigation";
import db from "../_libs/_server/db";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { formatToTimeAgo } from "../_libs/_client/utils";
import Image from "next/image";

interface CommentBoxProps {
  postId: string;
}

async function getComment(postId: number) {
  const comment = await db.comment.findMany({
    where: {
      postId: postId,
    },
    orderBy: {
      created_at: "asc",
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return comment;
}

const getCachedComment = nextCache(getComment, ["post-comment"], {
  tags: ["post-comment"],
  revalidate: 1,
});

export async function CommentBox({ postId }: CommentBoxProps) {
  const id = Number(postId);
  const comment = await getCachedComment(id);

  if (!comment || comment.length === 0) {
    return <p>답변이 없습니다.</p>;
  }

  return (
    <div>
      {comment.map((comment) => (
        <div className="flex items-start space-x-3 border-b mb-2">
          {comment.user.avatar ? (
            <Image
              src={comment.user.avatar}
              alt="profile image"
              className="rounded-full w-8 h-8 bg-cover"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-300"></div>
          )}

          <div>
            <span className="text-sm block font-medium text-gray-700">
              {comment.user.username}
            </span>
            <span className="text-xs text-gray-500 block">
              {formatToTimeAgo(comment.created_at.toString())}
            </span>
            <p className="text-gray-700 my-2">{comment.payload}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
