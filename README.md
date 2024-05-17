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

# Prisma

<details>
   <summary>개념 및 사용법</summary>

   <br/>

- 개념 
  프리즈마는 대중적인 타입스크립트 지원 ORM 중 하나다.
프리즈마 설치 전에 기본적인 DB 개발 환경은 갖춰두도록 하자. 설치 명령은 아래와 같다.

<br/>

```
npm i prisma
```

- 사용법

  설치 후 프로젝트에 프리즈마 적용을 위해 아래 명령을 실행한다.
그러면, 루트에 prisma 폴더와 함께 그 아래 schema.prisma 파일이 새로 생성된다.
덤으로 데이터베이스 스키마 정보 연동을 위한 환경변수 설정에 필요한 .env 파일도 알아서 생성해준다.

```
npx prisma init
```

<br/>

이후 차근차근 진행하자

```
✔ Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

순서대로 하려면 먼저 .env 파일을 확인하고 데이터베이스 정보를 입력해준다.
데이터베이스 정보(DATABASE_URL)는 개발자가 선택한 데이터베이스 유형마다 다른 패턴을 가지므로
프리즈마 공식 사이트에서 정확히 확인하고 기재해야 한다.

<br/>

- 초기 .env 파일을 보면, 데이터베이스별 프리즈마 연동법을 설명한 <a href="https://www.prisma.io/docs/orm/reference/connection-urls" target="_blank">상세 페이지</a>가 기재돼 있으니 확인
- 데이터베이스 정보는 노출해서는 안 되는 개인정보이므로, .gitignore 파일에 ```.env``` 추가 필수

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" // 변경
```

<br/>

```schema.prisma``` 파일에서 선택한 데이터베이스를 제공자(provider)로 변경

```
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql" // 변경
    url      = env("DATABASE_URL")
}
```

데이터베이스가 연결이 돼 있는 상태라면 터미널에서 아래 명령을 입력한다.

```.env``` 파일에 환경변수로 입력된 DATABASE_URL과
```schema.prisma``` 파일에 입력된 스키마 모델을 토대로
새로운 데이터베이스를 만들어주는 명령이다

이 명령은 스키마를 변경했을 때마다 재실행해줘야 한다.

```
npx prisma migrate dev
```

그러면 아래와 같은 질문이 뜨는데, 깃 커밋 메시지와 같은 개념이다.
아래와 같이 모델과 관련성 있는 이름을 짓고 엔터를 누른다.
띄어쓰기가 허용되지 않으므로, 필요한 경우 '_'를 넣어 작성한다.

```
? Enter a name for the new migration: add_user
```

위 일련의 행위는 아래 명령으로 한 번에 처리할 수도 있다.

```
npx prisma migrate dev --name ["모델 변경 설명(제목)"]
```

이후 prisma 폴더 아래 migrations 폴더가 새로 생성되고
그 하위에 날짜_모델변경설명(제목)형식의 폴더와 CREATE 문이 입력된
migration.sql 파일이 추가된 걸 확인할 수 있다.


이 시점에서 데이터베이스가 새로 생성된 것도 확인 가능한데,
약간의 시간차가 발생할 수 있으니, 새로고침을 계속 눌러준다.

또, 이때 프리즈마에서 아래 위치에
방금 만든 스키마를 위한 JS 파일과 타입까지 새로 생성했다는 사실도 확인할 수 있다.

-```node_modules/prisma/client,```

-```node_modules/@prisma/@client```

이 코드들 또한 개발에 활용 가능하므로 다음과 같이 import 해서 쓰면 된다.

- 등록
  ```javascript
  import { PrismaClient } from '@prisma/client';

   const db = new PrismaClient();

   const test = async () => {
     const user = await db.user.create({
       data: {
         username: 'test', // @unique 속성이라, 두 번째 실행부터 정상적으로 오류 발생
       },
     });
   }
   console.log(user);

   test();
  ```

  ```javascript
  INSERT INTO user (username) VALUES ('test');
  ```

  
- 조회 (JOIN)
  ```javascript
  export const getProduct = async (id: number) => 
     db.product.findUnique({
       where: { id },
       include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
     },
   });
  ```
  
  ```javascript
  SELECT
     product.id,
     product.name,
     product.description,
     product.price,
     product.image,
     product.created_at,
     product.updated_at,
     user.username,
     user.avatar
   FROM product
   INNER JOIN user ON product.user_id = user.id
   WHERE product.id = ?;
  ```

- 조회 - 페이지네이션: ```skip```, ```take``` 키 사용

  ```javascript
  export const getMoreProducts = async (page: number) => {
     return db.product.findMany({
         select: {
         title: true,
         price: true,
         created_at: true,
         photo: true,
         description: true,
         id: true,
       },
       skip: page,
       take: CONTENT_PER_PAGE,
       orderBy: {
         created_at: 'desc',
       },
     });
   };
  ```
  
- 삭제

  ```javascript
  await db.product.delete({
     where: { id: id },
   });
  ```

  ```javascript
  DELETE FROM product WHERE id = ?;
  ```

  프리즈마에서 제공하는 무료 DB프로그램은 아래의 명령어로 실행 가능하다
  스키마를 변경한 경우, 실행중인 프리즈마 스튜디오 종료 후 재실행을 하여야 새로운 스키마가 반영된 DB를 볼 수 있다.

  ```
  npx prisma studio
  ```
  
- 로그 보기

  ```javascript
  import { PrismaClient } from '@prisma/client';

   const db = new PrismaClient({
     log: [
       {
         emit: 'event',
         level: 'query',
       },
       {
         emit: 'stdout',
         level: 'error',
       },
       {
         emit: 'stdout',
         level: 'info',
       },
       {
         emit: 'stdout',
         level: 'warn',
       },
     ],
   });

   export default db;
  ```

   로그 형식을 지정하는 함수는 종단에서 실행될 수 없으므로, libs/hooks.ts 유틸로 분리

  ```javascript
  export const setQueryLog = (roll: string, caller: string, result?: object | null) => {
     db.$on('query', (e) => {
       // SQL 키워드 자동 개행 및 색상 부여
       const query = e.query
         .toString()
         .replace(
           /(SELECT|UPDATE|DELETE|FROM|JOIN ON|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|OFFSET)\b/g,
           '\n\x1b[35m$1\x1b[0m',
         )
         .replace(/(DESC|ASC)\b/g, '\x1b[35m$1\x1b[0m')
         .replace(/,/g, '\n')
         .replaceAll('`', '');

       console.log(chalk.black(chalk.bgCyan(` ❖ caller: ${caller} `)));
       console.log(chalk.black(chalk.bgCyan(` ❖ roll: ${roll} `)));
       console.log(`${chalk.cyan('Query: ')}${query}`);
       console.log(`${chalk.blue('Params: ')}${e.params}`);
       console.log(
         `${chalk.yellow('Duration: ')}${e.duration}ms ${e.duration >= 2 ? chalk.red('Too Lazy') : chalk.green('Good')}`,
       );
       result && console.log(`${chalk.cyan('Result:')}`);
       result && console.log(result);
       console.log(chalk.black(chalk.bgCyan(` ❖ DONE! ❖ `)));
     });
   };
  
  ```

  서버 콘솔 - 예시(상품목록 더 보기)

  ```javascript
   ❖ caller: getPosts 
    ❖ roll: 동네생활 포스트 목록 조회
   Query:
   SELECT carrot_market_reloaded.User.id
    carrot_market_reloaded.User.username
    carrot_market_reloaded.User.email
    carrot_market_reloaded.User.password
    carrot_market_reloaded.User.phone
    carrot_market_reloaded.User.github_id
    carrot_market_reloaded.User.avatar
    carrot_market_reloaded.User.created_at
    carrot_market_reloaded.User.updated_at
   FROM carrot_market_reloaded.User
   WHERE (carrot_market_reloaded.User.id = ? AND 1=1)
   LIMIT ?
   OFFSET ?
   Params: [5,1,0]
   Duration: 0ms Good
   Result:
   [
     {
       id: 1,
       title: '이물건 팔아요',
       description: '가성비갑!',
       views: 0,
       created_at: 2024-05-02T06:33:43.594Z,
       _count: { comments: 0, likes: 2 }
     }
   ]
    ❖ DONE! ❖
  ```

</details>
