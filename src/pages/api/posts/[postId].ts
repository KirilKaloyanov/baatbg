import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@firebaseAdminConfig"

export default async function handler( req: NextApiRequest, res: NextApiResponse  ) {
    const { postId } = req.query;
    const { body } = req;

    if (req.method == "DELETE" && typeof postId == 'string') {
        const refDoc = admin.firestore().collection("posts").doc(postId);
        const resp = await refDoc.delete();
        if (resp) res.status(200).json({ message: "Deleted"})
        return
    } 

    if (req.method == "PUT" && typeof postId == 'string') {
    try {
        const refDoc = admin.firestore().collection("posts").doc(postId);
        console.log(body)

        await refDoc.update({content: body})
        res.status(200).json({message: "Updated"})
        return
    } catch (er) {
        console.log(er)
        res.status(500).json({message: "Not updated"})
        return
    }

    }
}