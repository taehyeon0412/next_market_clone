"use client";

import { useRouter } from "next/navigation";
import DeleteItem from "./delete-item";

type Props = {
  itemId: number;
};

export default function ItemDeleteButton({ itemId }: Props) {
  const router = useRouter();
  async function handleDelete() {
    const res = await DeleteItem(itemId);

    if (res) {
      alert("삭제되었습니다");
      router.replace("/home");
    } else {
      alert("실패했습니다");
    }
  }

  return (
    <button
      className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
      onClick={handleDelete}
    >
      삭제
    </button>
  );
}

//삭제 누르면 모달창 나오게 하기 예,아니요
