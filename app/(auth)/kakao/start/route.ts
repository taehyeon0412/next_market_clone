import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export function GET() {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const isProduction = process.env.NODE_ENV === "production";
  const KAKAO_REDIRECT_URL = isProduction
    ? "https://next-market-clone.vercel.app/kakao/complete"
    : "http://localhost:3000/kakao/complete";

  const params = {
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: KAKAO_REDIRECT_URL,
    response_type: "code",
    scope: "profile_nickname, profile_image",
    prompt: "login",
  };

  const formattedParams = new URLSearchParams(params).toString();
  //params를 URL에 넣어주는것

  const finalUrl = `${baseURL}?${formattedParams}`;
  //baseURL+formattedParams를 합쳐준다

  const response = NextResponse.redirect(finalUrl);

  response.headers.set("Cache-Control", "no-store"); // 캐시를 사용하지 않도록 설정

  return response;
}
