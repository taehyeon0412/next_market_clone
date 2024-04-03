"use server";

import crypto from "crypto";
import validator from "validator";
import { z } from "zod";
import { redirect } from "next/navigation";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import twilio from "twilio";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 번호 형식입니다."
  );
//전화번호

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}
//토큰 유효성 검사

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, "잘못된 인증번호입니다.");
//인증코드
//coerce는 유저가 입력한 string을 강제로 다른것으로 변환함

interface ActionState {
  token: boolean;
}

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken(); //똑같은 토큰이 db에 있으면 다시 실행
  } else {
    return token;
  }
}
//새로운 토큰을 만들어서 SMS를 통해 twilio->user에게 보내야됨

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  //prevState = ActionState는 기본값이 false로 되어있음
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
        //잘못된 번호를 입력하면 token값은 false로 반환
      };
    } else {
      //올바른 번호가 입력되면 기존에 있던 로그인 토큰을 삭제해야됨
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });

      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              //connectOrCreate는 인증한 전화번호를 가지고 있는 user가 있으면 연결해달라고함
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
                //인증한 전화번호가 db에 없는것이면 새로운 user를 만들어서 연결함
              },
            },
          },
        },
      });
      //토큰을 새로 만듦

      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await client.messages.create({
        body: `당근 마켓 인증번호: ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.TWILIO_MY_NUMBER!,
      });
      //twilio를 사용하여 sms를 보내는 기능

      return {
        token: true,
      };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token); //토큰이 올바른지 검증

    if (!result.success) {
      //토큰 불일치
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      //토큰 일치
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });

      //유저 로그인
      if (token) {
        const session = await getSession();
        session.id = token.userId; //session.id에 token.userId를 넣음
        await session.save();
        await db.sMSToken.delete({
          where: {
            id: token.id,
          },
        });
        //마지막으로 sms 인증 토큰을 삭제함
      }

      redirect("/home");
    }
  }
}

/* 처음 버튼을 누르면 token은 false인 상태이고 
if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return {
        token: false,
        //잘못된 번호를 입력하면 token값은 false로 반환
      };
    } else {
      return {
        token: true,
      };
    }
  }
  여기가 돌아가게 됨 
  phone의 유효성검사가 success가 되면 숨겨놨던 input이 나옴
  */

/* 숨겨놨던 input이 나오게 되고 버튼을 누르면 token은 true로 활성된 상태니
  else {
    const result = tokenSchema.safeParse(token);

    if (!result.success) {
      return {
        token: true,
        //나중에 에러도 리턴으로 할 것
      };
    } else {
      redirect("/home");
    }
  }
여기가 돌아가게 되고 
토큰값의 유효성이 확인되면 redirect 됨
  */

/* 
1.올바른 번호가 입력되면 기존에 있던 로그인 토큰을 삭제해야됨

2.새로운 토큰을 만들어서 SMS를 통해 twilio->user에게 보내야됨

3. 토큰이 누구에게 연결되어 있는지 userId와 토큰을 연결시켜줘야됨

4. 로그인 -> 페이지 이동

*/
