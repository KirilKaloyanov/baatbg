import { admin } from "@firebaseAdminConfig";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    
    const authorizationToken = await req.headers.get('authorization');

    if ( !authorizationToken || !authorizationToken.startsWith('Bearer ')) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }

    const token = authorizationToken.split(" ")[1];

    try {
        const user = await admin.auth().verifyIdToken(token);
        const authorizedId = process.env.AUTHORIZED_UID;

        if (user.uid === authorizedId) {

            const apiKey = process.env.TINYMCE_API_URL;
            if (!apiKey) throw new Error(`Api key is missing in ${process.env}`)

            return Response.json(apiKey, {status: 200})

        } else return Response.json({ message: "Forbidden" }, { status: 403 })
    } catch (err) {
        console.log("Error getting key in TinyMCE", err)
        return Response.json({ message: "Error getting key" }, { status: 500 })
    }
    

    console.log(token)
    return Response.json({message: 'something'})
}