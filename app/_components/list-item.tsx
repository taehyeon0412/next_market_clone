//홈화면 아이템 리스트 나오는것

import Image from "next/image";
import Link from "next/link";
import { formatToTimeAgo, formatToWon } from "../_libs/_client/utils";
import { usePathname } from "next/navigation";

interface ListItemProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
  userId: number;

  _count: {
    hearts: number;
  };
}

export default function ListItem({
  title,
  price,
  created_at,
  photo,
  id,
  userId,
  _count,
}: ListItemProps) {
  const pathname = usePathname();

  if (pathname === "/home" || "/profile/sold") {
    return (
      <Link
        href={`/items/${id}`}
        className="flex px-4 border-b pb-4 cursor-pointer justify-between"
      >
        <div className="flex space-x-4 items-center">
          <div className="relative size-28 rounded-md overflow-hidden">
            <Image fill src={photo} alt={title} className="object-cover" />
          </div>

          <div className="flex flex-col gap-1 h-full justify-between ">
            <div className="flex flex-col pt-4">
              <span className="text-lg font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-[140px] sm:max-w-[280px]">
                {title}
              </span>
              <span className="text-sm text-neutral-400">
                {formatToTimeAgo(created_at.toString())}
              </span>
            </div>
            <div>
              <span className="text-lg font-semibold">
                {formatToWon(price)}원
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 items-end justify-end">
          <div className="flex space-x-0.5 items-center text-sm text-gray-600">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{_count.hearts}</span>
          </div>

          {/*  <div className="flex space-x-0.5 items-center text-sm text-gray-600">
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
            <span>1</span>
          </div> */}
        </div>
      </Link>
    );
  } else if (/^\/items\/.+/.test(pathname)) {
    return (
      <Link href={`${id}`} className="z-0">
        <div className="relative h-48 sm:h-56 w-full mb-4 bg-slate-300 z-0">
          <Image fill className="bg-cover z-0" src={photo} alt="itemPhoto" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className=" text-gray-700 -mb-1 overflow-hidden whitespace-nowrap text-ellipsis max-w-[140px] sm:max-w-[280px]">
            {title}
          </h3>
          <span className="text-sm font-semibold text-gray-900">
            {formatToWon(price)}원
          </span>
        </div>
      </Link>
    );
  }
}

//next.js의 Image 컴포넌트의 fill 속성은 부모 요소만큼 이미지를 채우는것이고 absolute속성이다
//그래서 부모에 relative를 주고 Image에는 fill을 주면 된다.
