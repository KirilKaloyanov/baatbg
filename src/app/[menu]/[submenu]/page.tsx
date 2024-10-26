import { getPostBySubMenuId } from "@services/firestoreService";

export default async function SubMenu({ params } : { 
    params: { menu: string, submenu: string}
}) {
    const { submenu } = params;

    //rename to getPostBySubMenuId
    const data = await getPostBySubMenuId(submenu);

    return (
    <>
        <h1>{submenu} Submenu item</h1>
        <div
        dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
        ></div>
    </>
    )
}