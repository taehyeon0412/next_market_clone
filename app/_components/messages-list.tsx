"use client";

import { useEffect, useRef, useState } from "react";
import { initialMessages } from "../(tabs)/chats/[id]/page";
import Image from "next/image";
import { formatToTimeAgo } from "../_libs/_client/utils";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { saveMessage } from "../(tabs)/chats/[id]/action";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdnFhemp5bWJnY3h2aWJpbnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMjIwMDIsImV4cCI6MjAyOTg5ODAwMn0.NfYYn_TQgtnFXzdweiKa_TcFsEYaudbfytAXfEaYSQI";

const SUPABASE_URL = "https://imvqazjymbgcxvibinsu.supabase.co";

interface initialMessagesProps {
  initialMessages: initialMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
}

export default function MessagesList({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
}: initialMessagesProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  //input

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          avatar: "xxx",
        },
      },
    ]);

    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });

    await saveMessage(message, chatRoomId);
    setMessage("");
  };
  //form submit

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
      //유저가 채팅방을 나가면 subscribe을 없애는것
    };
  }, [chatRoomId]);
  //실시간 채팅

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

      <div className="py-10 px-4 space-y-4">
        <div className="fixed w-full mx-auto max-w-md bottom-2 left-0 right-0 inset-x-0">
          <form className="relative flex items-center" onSubmit={onSubmit}>
            <input
              required
              onChange={onChange}
              value={message}
              name="message"
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm text-white">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* 채팅 input form */}
    </div>
  );
}
