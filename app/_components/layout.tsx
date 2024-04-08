"use client";

import Link from "next/link";
import { cls } from "../_libs/_client/utils";
import { useRouter, usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
}

export default function Layout({
  children,
  title,
  canGoBack,
  hasTabBar,
}: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (pathname === "/create-account" || pathname === "/enter") {
      router.push("/");
    } else {
      router.back();
    }
  };
  //뒤로가기

  console.log(pathname);

  return (
    <div>
      <div
        className={cls(
          !canGoBack ? "justify-center" : "",
          "z-50 bg-white w-full max-w-lg mx-auto px-5 text-lg font-medium py-3 fixed text-gray-800 border-b top-0 flex items-center"
        )}
      >
        {canGoBack ? (
          <button onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        ) : null}
        {title ? <span>{title}</span> : null}
      </div>

      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>{children}</div>

      {hasTabBar ? (
        <nav className="grid grid-cols-5 bg-white max-w-lg text-gray-700 border-t fixed bottom-0 w-full px-4 pb-3 pt-3 text-xs">
          <Link href="/home">
            <div
              className={cls(
                "flex flex-col items-center space-y-2 ",
                pathname === "/home"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>홈</span>
            </div>
          </Link>

          <Link href="/items/community">
            <div
              className={cls(
                "flex flex-col items-center space-y-2 ",
                pathname === "/items/community"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                ></path>
              </svg>
              <span>동내생활</span>
            </div>
          </Link>

          <Link href="/items/upload">
            <div
              className={cls(
                "flex flex-col items-center space-y-2 ",
                pathname === "/streams"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>등록</span>
            </div>
          </Link>

          <Link href="/chats">
            <div
              className={cls(
                "flex flex-col items-center space-y-2 ",
                pathname === "/chats"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>채팅</span>
            </div>
          </Link>

          <Link href="/profile">
            <div
              className={cls(
                "flex flex-col items-center space-y-2 ",
                pathname === "/profile"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span>마이페이지</span>
            </div>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
