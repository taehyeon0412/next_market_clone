import Layout from "@/app/_components/layout-bar";
import { formatToWon } from "@/app/_libs/_client/utils";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DeleteItem from "./delete-item";
import ItemDeleteButton from "./delete-button";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
    //db에 있는 userId와 upload한 userId가 같다면 해당사용자는 true
  }
  return false; //나머지는 false
}
//upload한 아이템의 user를 찾는 함수

async function getItem(id: number) {
  const item = await db.item.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    }, //user에 username과 avatar를 포함시켜서 item에 나타냄
  });
  /* console.log(item); */
  return item;
}

export default async function ItemDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  //id가 숫자가 아닐경우 notFound

  const item = await getItem(id);
  if (!item) {
    return notFound();
  }
  //item의 id가 없다면 notFound

  const isOwner = await getIsOwner(item.userId);

  return (
    <>
      <Layout canGoBack />
      <div className="px-4">
        {/* profile */}

        <div className="mb-8">
          <div className="relative aspect-square">
            <Image fill src={item.photo} alt={item.title} />
          </div>
          {/* 상품 이미지 */}

          <div className="flex  cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="relative size-11 rounded-full bg-slate-300">
              {item.user.avatar !== null ? (
                <Image
                  fill
                  src={item.user.avatar}
                  alt={item.user.username}
                  className="rounded-full overflow-hidden"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-300" />
              )}
            </div>
            {/* 프로필이미지 */}

            <div>
              <p className="text-sm font-medium text-gray-700">
                {item.user.username}
              </p>
            </div>
            {/* 사용자 프로필 */}
          </div>

          {/* Main */}

          <div className="mt-5 ">
            <h1 className="text-3xl font-semibold text-gray-900">
              {item.title}
            </h1>
            <p className="text-base my-6 text-gray-700">{item.description}</p>

            <div className="fixed w-full border-t bottom-0 mx-auto left-0 right-0 max-w-lg p-5 pb-5 bg-white flex justify-between items-center">
              <div className="flex items-center">
                <button className="p-3 flex rounded-md items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                {/* 하트 */}

                <div className="border-r w-1 h-10 mr-4"></div>

                <span className="font-bold text-sm">
                  {formatToWon(item.price)}원
                </span>
              </div>

              <div className="flex gap-4">
                {isOwner ? <ItemDeleteButton itemId={item.id} /> : null}

                <Link
                  className="bg-orange-500 px-3 py-2 rounded-md text-white font-semibold text-sm"
                  href={""}
                >
                  채팅하기
                </Link>
              </div>
            </div>
            {/* 하단 가격,채팅바 */}
          </div>
        </div>

        {/* 섹터 구분 */}

        <div>
          <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className=" text-gray-700 -mb-1">Galaxy S60</h3>
                <span className="text-sm font-medium text-gray-900">$6</span>
              </div>
            ))}
          </div>
        </div>

        {/* 비슷한 상품 */}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const items = await db.item.findMany({
    select: {
      id: true,
    },
  });
  //items에 마우스를 올려보면 배열로 나타남

  return items.map((item) => ({
    id: item.id + "",
  }));
  //map은 array를 변환 할 수 있게 해주는 기본함수
  //array를 가져와서 array의 모든 아이템에 대해 object를 리턴함
}

/* 
generateStaticParams()는 무조건 array를 리턴 해야된다.
ItemDetail에 있는 params: { id: string } 속성에 맞게 
return [
  {id:"4"}
]
이런식으로 만들어야 됨


*/