import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout";
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

        <div>
          <label
            htmlFor="dsc"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            className="mt-1 shadow-sm w-full  focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
            id="dsc"
            rows={4}
          />
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Go live
        </button>
      </div>
    </Layout>
  );
};

export default Create;
