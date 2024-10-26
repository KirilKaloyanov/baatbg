import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@firebaseAdminConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const snapshot = await admin
        .firestore()
        .collection('users')
        .doc("muzeFeqoiep9UwTmbunY")
        .collection('posts')
        .get();

    snapshot.forEach(doc => {
        console.log(doc.id, '->', doc.data()); 
    })

    const postsRef = admin
        .firestore()
        .collection('users')
        .doc("CwChTKWzuGKju8q44Ssm")
        .collection('posts')

    postsRef.add({
        title: "First Post",
        content: "Post Content from API route"
    })

    res.end();
}