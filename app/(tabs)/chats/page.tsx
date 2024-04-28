import ChatList from "@/app/_components/chat-list";
import Layout from "@/app/_components/layout-bar";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";

export default async function Chats() {
  const session = await getSession();
  const userId = session.id!;

  //userId가 들어가있는 채팅방을 찾음
  const rooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: {
            in: [userId],
          },
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });

  return (
    <>
      <Layout hasTabBar title="채팅" />
      <div className="pb-10 divide-y-[1px]">
        {rooms.map((room) => {
          // 현재 채팅방에서 다른 사용자 찾기
          const otherUser = room.users.find((user) => user.id !== userId);
          //마지막 메세지 찾기
          const lastMessage =
            room.messages.slice(-1)[0]?.payload || "마지막 메세지 없음";

          return (
            <ChatList
              id={room.id}
              src={otherUser?.avatar!}
              lastMessage={lastMessage}
              updated_at={room.updated_at}
              username={otherUser?.username!}
            />
          );
        })}
      </div>
    </>
  );
}
