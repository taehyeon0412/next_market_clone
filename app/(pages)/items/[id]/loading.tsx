import Layout from "@/app/_components/layout";

export default function Loading() {
  return (
    <Layout canGoBack>
      <div className="animate-pulse p-5 flex flex-col gap-5">
        <div className="aspect-square border-neutral-700 text-neutral-700 border-4 border-dashed rounded-md flex justify-center items-center">
          <svg
            className="h-28 w-28"
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
        </div>
        <div className="flex gap-2 items-center">
          <div className="size-14 rounded-full bg-neutral-700" />
          <div className="flex flex-col gap-1">
            <div className="h-5 w-40 bg-neutral-700 rounded-md" />
            <div className="h-5 w-20 bg-neutral-700 rounded-md" />
          </div>
        </div>
        <div className="h-10 w-80 bg-neutral-700 rounded-md" />
      </div>
    </Layout>
  );
}
