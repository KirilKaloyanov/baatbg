import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@firebaseAdminConfig"

export default async function handler( req: NextApiRequest, res: NextApiResponse  ) {

    if (req.method == "POST") {
        let { content } =  req.body
        const refAny = admin.firestore().collection("posts")
        try {
            await refAny.add({content})
        } catch (err) {
            console.log(err)
            return res.status(500);
        }

        return res.status(200).json({message: "Successfully saved"});
    }

}