import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@firebaseAdminConfig"

export default async function handler( req: NextApiRequest, res: NextApiResponse  ) {

    if (req.method == "POST") {
        let { content } =  req.body
        console.log(content)
        const refAny = admin.firestore().collection("posts")
        try {
            await refAny.add({content})
            console.log('/api/posts POST handler', content)
        } catch (err) {
            console.log(err)
            return res.status(500);
        }

        return res.status(200).json({message: "Successfully saved"});
    }

}