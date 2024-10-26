import { getPostsByMenuId } from "@services/firestoreService";


export default async function MainMenu({ params } : { 
    params: { menu: string }
}) {
    const { menu } = params;

    const items = await getPostsByMenuId(menu)
return (<>
    <h1>{menu} Main menu gallery</h1>
    {items?.map(item => (
        <div key={item.id}>{item.data.subMenuId}</div>
    ))}
</>)
}