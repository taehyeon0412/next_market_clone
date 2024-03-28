export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
//강력한 비밀번호를 위해서 소문자,대문자,숫자,특수문자를 포함해야되는 변수추가

export const PASSWORD_MIN_LENGTH_ERROR = "10글자이상 입력해 주세요.";
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자,대문자,숫자,특수문자를 포함해야 합니다.";
