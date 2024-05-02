import Layout from "@/app/_components/layout-bar";
import { getInitialItems } from "../../home/page";
import ItemPagination from "@/app/_components/item-pagination";
import getSession from "@/app/_libs/_server/session";

export default async function Loved() {
  const initialItems = await getInitialItems();
  const session = await getSession();

  console.log(session.id);

  return (
    <>
      <Layout canGoBack title="관심 목록" />
      <div className="flex flex-col space-y-5">
        <ItemPagination initialItems={initialItems} userId={session.id!} />
      </div>
    </>
  );
}
