"use client";

import { useRouter } from "next/navigation";
import deleteItemAction from "./delete-item";

type Props = {
  itemId: number;
};

export default function ItemDeleteButton({ itemId }: Props) {
  const router = useRouter();
  async function handleDelete() {
    const res = await deleteItemAction(itemId);

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
