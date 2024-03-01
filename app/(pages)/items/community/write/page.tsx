import Layout from "@/app/_components/layout";
import TextArea from "@/app/_components/textarea";
import { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <TextArea required placeholder="Ask a question!" />

        <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Write;
