import db from "./db";

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
//강력한 비밀번호를 위해서 소문자,대문자,숫자,특수문자를 포함해야되는 변수추가

export const PASSWORD_MIN_LENGTH_ERROR = "10글자이상 입력해 주세요.";
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자,대문자,숫자,특수문자를 포함해야 합니다.";

//-------------------------------------- 가입 로직

//유저 닉네임 중복 유효성 검사 로직
export const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

/* Boolean(user) === false 가 맞다면 true를 반환함
(일치하는 닉네임이 없어야 회원가입이 되니까)*/

//유저 이메일 중복 유효성 검사 로직
export const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

//기존 사용자 로그인 로직

//유저 이메일 유효성 검사
export const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};
