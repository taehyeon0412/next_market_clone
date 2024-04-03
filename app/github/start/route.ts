import { redirect } from "next/navigation";

export function GET() {
  const baseURL = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
    allow_signup: "true",
  };

  const formattedParams = new URLSearchParams(params).toString();
  //params를 URL에 넣어주는것

  const finalUrl = `${baseURL}?${formattedParams}`;
  //baseURL+formattedParams를 합쳐준다

  return redirect(finalUrl);
}
