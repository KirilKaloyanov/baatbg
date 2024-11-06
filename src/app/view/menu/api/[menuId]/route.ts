//"/view/menu/api/[menuId]"

import { admin } from "@firebaseAdminConfig";
import { MenuDTO } from "@interfaces/admin/MenuDTO";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest,
     {params} : { params: Promise<{ menuId: string }> }
) {

    const { menuId } = await params
    
    const menuRef =  admin.firestore().collection("menu").doc(menuId);
    // const menu = menuRef.getData();
    const menuSnapShot = await menuRef.get()
    const menuData = {id: menuSnapShot.id, ...menuSnapShot.data()}

    const subMenuRef = menuRef.collection('subMenu')
    const subMenuSnapShot = await subMenuRef.get()

    const subMenus = subMenuSnapShot.docs.map(doc => ({id: doc.id, ...doc.data()}))

    return NextResponse.json({menuData, subMenus})

}

export async function POST(req: NextRequest,
    {params} : { params: Promise<{ menuId: string }> }
) {
    const { menuId } = await params;
    const data : MenuDTO = await req.json(); // Parsing JSON data from the request body
  
    try {
      const ref = admin.firestore().collection("menu").doc(menuId);
  

      const updated = {
        position: data.position,
        path: data.path,
        name: data.name
      }
      // Perform a partial update
      await ref.update(updated);
      console.log('Document updated successfully');
  
      return NextResponse.json({ message: 'Document updated successfully' });
    } catch (error) {
      console.error('Error updating document:', error);
      return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
    }
}