"use server";

import { redirect } from "next/navigation";

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve: any) => setTimeout(resolve, 2000));
  console.log("유저 로그인");

  return {
    error: ["비밀번호가 다릅니다.", "비밀번호 다시 치세요!"],
  };
};
