export default async function SubMenu( { params } : { params: {menuId: string, subMenuId: string }}){
    const { menuId, subMenuId } = await params; 
    console.log(menuId,subMenuId);
    return <h1>{ menuId + subMenuId }</h1>
}