import Button from "@/app/_components/button";
import Layout from "@/app/_components/layout-bar";
import TextArea from "@/app/_components/textarea";
import { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <>
      <Layout canGoBack />
      <form className="px-4 py-10">
        <TextArea required placeholder="질문을 입력해 보세요!" />

        <Button text="질문하기"></Button>
      </form>
    </>
  );
};

export default Write;
