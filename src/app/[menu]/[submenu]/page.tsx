import { getPostsBySubMenuId } from "@services/firestoreService";

export default async function SubMenu({ params } : { 
    params: { menu: string, submenu: string}
}) {
    const { submenu } = params;

    const data = await getPostsBySubMenuId(submenu);
    console.log(data)

    return (
        <div
        dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
      ></div>
    )
}