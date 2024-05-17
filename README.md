# Validation

<details>
<summary>Zod - 간편 유효성 검사 모듈</summary>
<br>

   form 요소와 함께 사용할 때 유효성 검사 도구로 많이 사용됨
   
<br/>


- 폼 스키마 생성

 
```javascript
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

  <br/>

- 폼 스키마 파싱 - 유효성 검사 수행
  <br/>
 ```javascript
'use server';
 ...

 export const createAccount = (prevState: any, formData: FormData) => {
   const data = {
     username: formData.get('username'),
     email: formData.get('email'),
     password: formData.get('password'),
     confirm_password: formData.get('confirm_password'),
   };
  
   // formSchema.parse(data) 적용 시 try-catch 필수
   const result = formSchema.safeParse(data);

   if (!result.success) {
     return result.error.flatten();
   } else {
     console.log(result.data);
   }
 };
```
<br/>

- 폼 상태 참조 - 컴포넌트 계층

```javascript
'use client';
...

import { useFormState } from 'react-dom';
import { createAccount } from '@/app/create-account/actions';
...

const [state, action] = useFormState(createAccount, null); //action.ts에 있는 createAccount를 가져옴
...
```
<br/>

- coerce - 숫자타입 입력값 검사
  인풋은 입력 값을 무엇으로 받든 모두 string으로 전달
  따라서, 인풋의 number 타입 입력 값은 정확한 검사를 위해 coerce를 거쳐야 한다.

  ```javascript
  'use server';

    import { z } from 'zod';
 
    const tokenSchema = z.coerce.number().min(100000).max(999999);
 
    export const smsLogin = async (prevState: any, formData: FormData) => {
        console.log(typeof tokenSchema.parse(formData.get('token'))); // number
    };
  ```

  </details>

<br/>

<details>
<summary>validator - 패턴 유효성 검사 모듈</summary>
   
<br/>

validator는 전화번호, 신용카드 번호 등 인풋의 문자열 입력값의 정규식 패턴을 간편 검사하는 모듈이다.
타입스크립트 지원이 안 되는 모듈이므로, @types/validator 도 함께 설치한다.

```javascript
'use server';

import { z } from 'zod';
import validator from 'validator';

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);
...
```
</details>

