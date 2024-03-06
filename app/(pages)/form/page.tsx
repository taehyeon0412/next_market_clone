"use client";

import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log("valid");
  };
  //폼이 유효할때

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  //폼이 유효하지 않을때

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "이름을 입력하세요.",
          minLength: {
            message: "5글자 이상 입력하세요",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", { required: "이메일을 입력하세요." })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: "비밀번호를 입력하세요." })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
