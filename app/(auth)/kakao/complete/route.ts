import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const KAKAO_REDIRECT_URL = isProduction
    ? "https://next-market-clone.vercel.app/kakao/complete"
    : "http://localhost:3000/kakao/complete";

  // 액세스 토큰 받기
  const url = req.nextUrl;
  const code = url.searchParams.get("code"); // URL의 검색 파라미터에서 `code`를 추출합니다.
  const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID!,
      redirect_uri: KAKAO_REDIRECT_URL,
      code: code ?? "",
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // 액세스 토큰으로 사용자 정보 요청
  const userInfoResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const userInfo = await userInfoResponse.json();

  //db에서 유저가 있는지 유효성 검사
  const user = await db.user.findUnique({
    where: {
      kakao_id: userInfo.id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("/home");
  }
  //기존 유저면 바로 홈으로 이동

  //새로운 유저면 사용자 정보를 DB에 저장하고 로그인
  const newUser = await db.user.create({
    data: {
      kakao_id: userInfo.id + "",
      avatar: userInfo.properties.profile_image,
      username: userInfo.properties.nickname,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/home");
}
