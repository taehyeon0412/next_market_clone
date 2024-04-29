"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import DeleteItem from "../(tabs)/items/[id]/delete-item";
import DeletePost from "../(tabs)/community/[id]/delete-post";

const customModalStyles: ReactModal.Styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    maxWidth: "420px",
    height: "40%",
    padding: "0px",
    gap: "5%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "none",
    borderRadius: "30px",
  },
};
//모달창 커스텀

type Props = {
  Id: number;
  menu: string;
};

export default function DeleteModal({ Id, menu }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  async function handleDelete() {
    if (menu === "item") {
      const res = await DeleteItem(Id);

      if (res) {
        router.replace("/home");
      }
    } else if (menu === "post") {
      const res = await DeletePost(Id);

      if (res) {
        router.replace("/community");
        setTimeout(() => {
          window.location.reload();
        }, 500); //나중에 삭제하고 넥스트캐시로 바꾸기
      }
    }
  }
  //백엔드 삭제 함수

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        customModalStyles.content!.height = "30%";
        customModalStyles.content!.width = "80%";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // width에 따라 모달창 css값 변경

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
      >
        삭제
      </button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div
          className="text-base
  font-bold sm:text-2xl"
        >
          정말로 물품을 지우시겠습니까?
        </div>
        <div className="mt-12 flex justify-between items-center w-full h-1/5 sm:px-12 px-6 gap-6">
          <button
            className=" border-0 w-1/2 h-16 sm:h-full sm:text-xl text-base hover:border-2 hover:border-black bg-slate-300 rounded-2xl font-semibold "
            onClick={closeModal}
          >
            아니오
          </button>
          <button
            className=" border-0 w-1/2 h-16 sm:h-full sm:text-xl text-base hover:border-2 hover:border-orange-500 bg-orange-300 rounded-2xl text-white font-semibold "
            onClick={handleDelete}
          >
            네
          </button>
        </div>
      </Modal>
    </>
  );
}
