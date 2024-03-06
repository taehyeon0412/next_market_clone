"use client";

import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register, //react-hook-form과 input을 연결해줌
    handleSubmit, //submit에 관련된 것을 해줌 인자로 onValid, onInvalid를 받음
    formState: { errors }, //form의 상태를 나타내줌 여기서는 에러를 표시
  } = useForm<LoginForm>({ mode: "onChange" }); //mode는 여러가지가 있음

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
        //기존에 있는 input에서는 html코드라서 사용자가 f12로 지울 수 있는데
        //...register를 사용하면 js코드로 들어가서 사용자가 변경 할 수 없게함
        //강력한 form을 만들 수 있다.
        type="text"
        placeholder="Username"
      />

      <input
        {...register("email", {
          required: "이메일을 입력하세요.",
          validate: {
            noGmail: (value) =>
              !value.includes("@gmail.com") || "gmail은 사용할 수 없습니다.",
          },
        })}
        //이렇게 자신만의 조건을 validate안에 넣어서 커스텀 할 수있다

        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      />

      <span>{errors.email?.message}</span>
      {/* 에러 메세지를 밖으로 뺄 수 있다 */}

      <input
        {...register("password", { required: "비밀번호를 입력하세요." })}
        type="password"
        placeholder="Password"
      />

      <input type="submit" value="Create Account" />
    </form>
  );
}
