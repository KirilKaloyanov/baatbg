import { getPostBySubMenuId } from "@services/postsService";

export default async function SubMenu({
  params,
}: {
  params: { menu: string; submenu: string };
}) {
  const { submenu } = await params;

  const data = await getPostBySubMenuId(submenu);

  return (
    <>
      <h1>_{submenu}+ Submenu item</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
      ></div>
    </>
  );
}
