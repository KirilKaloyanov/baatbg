
import { admin } from "@firebaseAdminConfig"

export default async function POST( req: Request, res: Response  ) {

        let body = await req.json();
        const refAny = admin.firestore().collection("posts")
        try {
            await refAny.add(body)
        } catch (err) {
            console.log(err)
            return Response.json({message: "Error saving"});
        }

        return Response.json({message: "Successfully saved"});
    

}