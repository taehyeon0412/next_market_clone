import Layout from "@/app/_components/layout-bar";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound(); //세션아이디(쿠키)가 없으면 notFound가 나타남
}

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  //로그아웃 로직

  return (
    <>
      <Layout hasTabBar title="마이페이지" />
      <div className="pb-10 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-slate-500 rounded-full">
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  alt="profile image"
                  className="rounded-full w-16 h-16 bg-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-300"></div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {user?.username}
              </span>
              {/*  <Link href={`profile/edit`}>
                <span className="text-sm text-gray-700">
                  프로필 수정 &rarr;
                </span>
              </Link> */}
            </div>
          </div>

          <form
            action={logout}
            className="cursor-pointer flex items-center px-2.5 py-0.5 rounded-md text-xs bg-gray-200 text-gray-500 font-semibold"
          >
            <button>로그아웃</button>
          </form>
        </div>

        <div className="mt-10 flex justify-around ">
          <Link
            href={"profile/sold"}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 flex text-white bg-orange-500 rounded-full items-center justify-center">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>

            <span className="text-sm font-medium text-gray-700 mt-2">
              판매내역
            </span>
          </Link>

          <Link
            href={"profile/bought"}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 flex text-white bg-orange-500 rounded-full items-center justify-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>

            <span className="text-sm font-medium text-gray-700 mt-2">
              구매내역
            </span>
          </Link>

          <Link
            href={"profile/loved"}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 flex text-white bg-orange-500 rounded-full items-center justify-center">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>

            <span className="text-sm font-medium text-gray-700 mt-2">
              관심목록
            </span>
          </Link>
        </div>
        {/* 프로필 메뉴 */}

        <div className="mt-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-slate-500" />

            <div>
              <h4 className="text-sm font-bold text-gray-800">사용자 이름</h4>
              <div className="flex items-center">
                <svg
                  className="text-yellow-400 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="text-gray-400 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-600 text-sm">
            <p>깨끗한 새제품이고 거래후에 맛있는 과자도 주셨어요!</p>
            <p>친절하셔요ㅋㅋ 잘쓰겠습니다~</p>
          </div>
        </div>
      </div>
    </>
  );
}
