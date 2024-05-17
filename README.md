## Validation

<br/>
<br/>

1. Zod - 간편 유효성 검사 모듈


   form 요소와 함께 사용할 때 유효성 검사 도구로 많이 사용됨

<br/>
<summary>폼 스키마 생성</summary>
 ```
 
'use server';
...

const formSchema = z
  .object({
     username: z
        .string({
           invalid_type_error: `이름은 ${INVALID.STRING}`,
           required_error: `이름을 ${INVALID.INPUT}`,
        })
        .min(3, INVALID.TOO_SHORT)
        .max(10, INVALID.TOO_LONG)
        .toLowerCase()
        .trim()
        // 그 외 유효성 검사 규칙과 메시지 추가 - refine, regex
        .regex(hasSlang(), '이름에 비속어가 포함돼 있습니다.')
        .transform((username) => `🔥 ${username} 🔥`),
     email: z.string().email(INVALID.EMAIL).trim().toLowerCase(),
     password: z
       .string()
       .min(10, INVALID.TOO_SHORT)
       .trim()
       .regex(
          pwRegex,
          '비밀번호는 대﹒소문자, 하나 이상의 숫자, 특수문자를 포함해야 합니다.',
       ),
     confirm_password: z.string().min(10, INVALID.TOO_SHORT).trim(),
  })
  // 객체 전체에 한 번에 적용하는 유효성 검사 => fieldErrors가 아닌, formErrors 로 오류 메시지 전달
  .refine(({ password, confirm_password }) => isValidPw({ password, confirm_password }), {
     // 단, 기존 fieldErrors 중 하나에 메시지를 표시하도록 하려면
     // 두번째 인자를 string 대신 아래와 같이 객체정보로 변경
     message: '입력된 비밀번호가 서로 다릅니다.',
     path: ['confirm_password'],
  });
  ```
