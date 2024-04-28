"use client";
import Image from "next/image";
import { formatToTimeAgo } from "../_libs/_client/utils";
import { useRouter } from "next/navigation";

interface ChatListProps {
  id: string;
  src: string;
  lastMessage: string;
  updated_at: Date;
  username: string;
}

export default function ChatList({
  id,
  src,
  lastMessage,
  updated_at,
  username,
}: ChatListProps) {
  const router = useRouter();

  const onClick = (id: string) => {
    router.push(`/chats/${id}`);
  };
  //채팅방 진입

  return (
    <div
      onClick={() => onClick(id)}
      key={id}
      className="flex px-4 cursor-pointer py-3 items-center space-x-3"
    >
      <div className="w-12 h-12 rounded-full bg-slate-300">
        <Image
          className="bg-cover rounded-full w-12 h-12"
          src={src}
          alt="profile"
          width={60}
          height={60}
        />
      </div>

      <div className="w-full">
        <p className=" text-gray-700">{username}</p>
        <div className="flex justify-between *:text-sm font-medium text-gray-500">
          <span>{lastMessage}</span>
          <span> {formatToTimeAgo(updated_at.toString())}</span>
        </div>
      </div>
    </div>
  );
}
