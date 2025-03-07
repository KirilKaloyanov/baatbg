import { getPostBySubMenuId } from "@services/postsService";
import './submenu.css';

export default async function SubMenu({
  params,
}: {
  params: Promise<{ menu: string; submenu: string; locale: string }>;
}) {
  const { submenu, locale } = await params;

  const data = await getPostBySubMenuId(submenu);

  return (
    <>
      <h1>.:{submenu}:. Submenu item</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data?.text[locale] || "No content" }}
      ></div>
    </>
  );
}
