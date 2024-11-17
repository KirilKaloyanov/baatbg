


// import PostForm from "@components/forms/postForm";
import { admin } from "@firebaseAdminConfig";
import EditPosts from "./editPosts";

export default async function EditPostCollection() {
    let key = process.env.TINYMCE_API_URL || "";

    const { docs } = await admin.firestore().collection("posts").get();

    const postList = docs.map(doc => ({id: doc.id, ...doc.data() as {content: string, menuPath: string, subMenuPath: string}}))

    return (
        <>
            <EditPosts postList={postList} apiKey={key} />
        </>
    )
}