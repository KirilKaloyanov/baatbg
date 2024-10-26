import { getPostsBySubMenuId } from "@services/firestoreService";

export default async function SubMenu({ params } : { 
    params: { menu: string, submenu: string}
}) {
    const { submenu } = params;

    //rename to getPostBySubMenuId
    const data = await getPostsBySubMenuId(submenu);

    return (
        <div
        dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
      ></div>
    )
}