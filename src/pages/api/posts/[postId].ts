import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@firebaseAdminConfig"

export default async function handler( req: NextApiRequest, res: NextApiResponse  ) {
    const { postId } = req.query;
    console.log(postId)

    if (req.method == "DELETE" && typeof postId == 'string') {
        const refDoc = admin.firestore().collection("posts").doc(postId);
        const resp = await refDoc.delete();
        if (resp) res.status(200).json({ message: "Deleted"})
    } else res.status(500);
}