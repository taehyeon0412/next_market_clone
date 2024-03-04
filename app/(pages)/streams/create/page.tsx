import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout";
import TextArea from "@/app/_components/textarea";
import { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-5 px-4">
        <Input
          required
          label="Name"
          name="name"
          placeholder="Name"
          type="text"
        />
        <Input
          required
          label="Price"
          name="price"
          placeholder="0.00"
          type="text"
          kind="price"
        />

        <div className="mb-1 block text-sm font-medium text-gray-700">
          <TextArea name="description" label="Description" />
        </div>

        <Button text="Go live" />
      </div>
    </Layout>
  );
};

export default Create;
