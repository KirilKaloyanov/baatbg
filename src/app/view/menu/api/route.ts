// "/view/menu/api"

// import { Response } from 'next/server';
import { admin } from "@firebaseAdminConfig";
import { MenuDTO } from "@interfaces/admin/MenuDTO";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
    // console.log(req);
    const ssss = await admin.firestore().collection('menu').get();
    const data = ssss.docs.map(doc => ({id: doc.id, data: doc.data()}))

    return Response.json(data)
}


export async function POST(req: NextRequest,) {

    const data : MenuDTO = await req.json(); // Parsing JSON data from the request body
  
    try {
      const ref = admin.firestore().collection("menu");
  

      const menu = {
        position: data.position,
        path: data.path,
        name: data.name
      }
      // Perform a partial update
      await ref.add(menu);
      console.log('Document saved successfully');
  
      return NextResponse.json({ message: 'Document saved successfully' });
    } catch (error) {
      console.error('Error updating document:', error);
      return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
    }
}
