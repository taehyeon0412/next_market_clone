import Layout from "@/app/_components/layout-bar";
import MessagesList from "@/app/_components/messages-list";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });

  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find((user) => user.id === session.id!));
    if (!canSee) {
      return null;
    }
  }
  //room에 있는 user.id와 session.id가 같을 경우에만 채팅방을 볼 수 있도록 함
  //다른 사용자가 url을 알아내서 강제로 보는것을 막기 위함
  return room;
}
//채팅방을 찾는 함수

async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId: chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}
//db에 있는 메세지를 모두 가져오는 함수

export type initialMessages = Prisma.PromiseReturnType<typeof getMessages>;
//타입이 변할때마다 교체 안해도 되도록 Prisma에서 타입을 받아옴

//타입스크립트에게 params가 string인 id가 있는 object라고 알려줌
export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);

  if (!room) {
    return notFound();
  }

  const initialMessages = await getMessages(params.id);
  const session = await getSession();

  return (
    <>
      <Layout canGoBack />
      <MessagesList initialMessages={initialMessages} userId={session.id!} />
    </>
  );
}
