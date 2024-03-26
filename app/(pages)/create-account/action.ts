"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
//강력한 비밀번호를 위해서 소문자,대문자,숫자,특수문자를 포함해야되는 변수추가

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, "5글자 이상 입력해 주세요")
      .max(15, "15글자 이하로 입력해 주세요")
      .toLowerCase() //대문자를 소문자로 자동변환
      .trim() //공백제거
      .refine(
        (username) => !username.includes("tomato"),
        "tomato는 입력할 수 없습니다."
      ),

    email: z.string().email("잘못된 이메일 형식입니다.").toLowerCase(),

    password: z
      .string()
      .min(10, "10글자이상 입력해 주세요.")
      .regex(
        passwordRegex,
        "비밀번호는 소문자,대문자,숫자,특수문자를 포함해야 합니다."
      ),

    password_check: z.string().min(10, "10글자이상 입력해 주세요."),
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
