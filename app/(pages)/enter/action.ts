"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  checkEmailExists,
} from "@/app/_libs/_server/constants";
import db from "@/app/_libs/_server/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "일치하는 이메일이 없습니다."),
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
    })
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten(); //error에 있는 거대한 정보중 간단한 정보를 담는 flatten을 사용함
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );

    if (ok) {
      const session = await getSession();
      session.id = user!.id;

      redirect("/home");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다."],
          email: [],
        },
      };
    }
  }
};

//이메일로 유저 찾기 zod에 refine 추가 완료
//유저가 찾아지면 비밀번호 해시값 찾기 bcrypt는 사용자가 보낸 비밀번호,db의 해시값을 받는다
//유저 로그인
//redirect "/home"
