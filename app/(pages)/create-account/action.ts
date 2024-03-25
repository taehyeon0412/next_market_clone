"use server";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(5).max(15),
  email: z.string().email(),
  password: z.string().min(10),
  password_check: z.string().min(10),
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
  }
  //return값이 useFormState의state값으로 들어감
}
