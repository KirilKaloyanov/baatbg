import { getPostBySubMenuId } from "@services/postsService";

export default async function SubMenu({
  params,
}: {
  params: Promise<{ menu: string; submenu: string }>;
}) {
  const { submenu } = await params;

  const data = await getPostBySubMenuId(submenu);

  return (
    <>
      <h1>.:{submenu}:. Submenu item</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
      ></div>
    </>
  );
}
