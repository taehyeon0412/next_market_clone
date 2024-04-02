import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }
  //코드없이 URL에 강제로 접속할 경우

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  //토큰에 필요한 항목

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  //baseURL+accessTokenParams을 합쳐준것

  const accessTokenResponse = await (
    await fetch(accessTokenURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("error" in accessTokenResponse) {
    return new Response(null, {
      status: 400,
    });
  }
  //accessTokenResponse에 오류가 있다면 400 에러가 나타나게함

  return Response.json({ accessTokenResponse });
}
