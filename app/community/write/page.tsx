import Button from "@/app/_components/button";
import Layout from "@/app/_components/layout";
import TextArea from "@/app/_components/textarea";
import { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <TextArea required placeholder="Ask a question!" />

        <Button text="Submit"></Button>
      </form>
    </Layout>
  );
};

export default Write;
