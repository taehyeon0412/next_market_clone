import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">안녕하세요!</h1>
            <h2 className="text-sm font-semibold">
              가입을 하려면 항목을 채워주세요.
            </h2>
          </div>

          <form>
            <div className="flex flex-col">
              <Input
                label="ID"
                name="id"
                type="text"
                placeholder="아이디"
                required
              />
              <Input
                label="Email"
                name="Email"
                type="email"
                placeholder="이메일 주소"
                required
              />
              <Input
                label="비밀번호"
                name="PassWord"
                type="password"
                placeholder="비밀번호"
                required
              />
              <Input
                label="비밀번호 확인"
                name="PassWord Check"
                type="password"
                placeholder="비밀번호 확인"
                required
              />
              <span>인풋 오류</span>
            </div>

            <Button text="생성 완료" />
          </form>
        </div>

        <div className="bg-white w-full max-w-lg mx-auto px-5 py-5 border-b flex items-center" />

        <div className="pt-4">
          <Link href="/sms">
            <Button text="✉ 휴대폰 번호로 가입하기" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
