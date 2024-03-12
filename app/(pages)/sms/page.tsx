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
            <h1 className="text-xl font-semibold">SMS로 가입하기</h1>
            <h2 className="text-sm font-semibold">
              휴대폰 번호를 입력해 주세요.
            </h2>
          </div>

          <form>
            <div className="flex flex-col">
              <Input
                label=""
                name="phone"
                type="number"
                placeholder="휴대폰 번호"
                required
              />
              <Input
                label=""
                name="phone code"
                type="number"
                placeholder="인증번호"
                required
              />
            </div>

            <Button text="인증코드 보내기" />
          </form>
        </div>

        <div className="bg-white w-full max-w-lg mx-auto px-5 py-4 border-b flex items-center" />
      </div>
    </Layout>
  );
}
