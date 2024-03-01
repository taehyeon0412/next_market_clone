import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout";
import TextArea from "@/app/_components/textarea";
import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 pt-16 mb-5">
        <div>
          <label className="w-full text-gray-600 hover:cursor-pointer hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input className="hidden" type="file" />
          </label>
        </div>

        <Input required label="Name" name="name" type="text" />
        <Input
          required
          label="Price"
          name="price"
          placeholder="0.00"
          type="text"
          kind="price"
        />

        <div className="mt-5 mb-1 block text-sm font-medium">
          <TextArea name="description" label="Description" />
        </div>

        <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Upload product
        </button>
      </div>
    </Layout>
  );
};

export default Upload;
