"use client";

import { useState } from "react";
import { initialMessages } from "../(tabs)/chats/[id]/page";
import Image from "next/image";
import { formatToTimeAgo } from "../_libs/_client/utils";

interface initialMessagesProps {
  initialMessages: initialMessages;
  userId: number;
}

export default function MessagesList({
  initialMessages,
  userId,
}: initialMessagesProps) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <div>
      <div className="p-5 flex flex-col gap-5 min-h-[85vh] justify-end">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 items-start ${
              message.userId === userId ? "justify-end" : ""
            }`}
          >
            {message.userId === userId ? null : (
              <Image
                src={message.user.avatar!}
                alt={message.user.username}
                width={50}
                height={50}
                className="size-8 rounded-full"
              />
            )}
            <div
              className={`flex flex-col gap-1 ${
                message.userId === userId ? "items-end" : ""
              }`}
            >
              <span
                className={`${
                  message.userId === userId
                    ? "bg-orange-500 text-white"
                    : "bg-neutral-200"
                } p-2.5 rounded-full`}
              >
                {message.payload}
              </span>
              <span className="text-xs">
                {formatToTimeAgo(message.created_at.toString())}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* 채팅 메세지 */}
    </div>
  );
}
