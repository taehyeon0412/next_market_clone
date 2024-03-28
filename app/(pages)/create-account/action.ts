"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/app/_libs/_server/constants";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string()
      .toLowerCase() //대문자를 소문자로 자동변환
      .trim() //공백제거
      .refine(
        (username) => !username.includes("tomato"),
        "tomato는 입력할 수 없습니다."
      ),

    email: z.string().email("잘못된 이메일 형식입니다.").toLowerCase(),

    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),

    password_check: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
  })
  .refine(({ password, password_check }) => password === password_check, {
    message: "비밀번호가 다릅니다.",
    path: ["password_check"],
    //zod에게 이것이 나타나는 위치(path)를 알려줘야됨
    //path를 지정하지 않으면 zod는 이 오류를 form 전체오류로 판단해버림
  });

//zod에게 데이터의 형식을 설명해줌

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_check: formData.get("password_check"),
  };
  //form데이터의 name에서 각각의 데이터를 불러옴

  const result = formSchema.safeParse(data);
  //safeParse는 에러가 없으면 success가 뜬다

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
  //return값이 useFormState의state값으로 들어감
}
