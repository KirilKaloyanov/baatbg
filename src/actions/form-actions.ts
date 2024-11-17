'use server';
import { admin } from "@firebaseAdminConfig";

export async function editMenu(prevState: any, formData: FormData) {

    let id = formData.get("id")
    const name = formData.get("name")
    const position = formData.get("position")
    const path = formData.get("path")

    
    const parsedPosition = parseInt(position as string);
    const menuDto =  {name, position: parsedPosition, path}
    


    if (typeof id == "string") {
        if (id == "create" && typeof path == "string") {
            id = path;
        } 
        const ref = await admin.firestore().collection("menu").doc(id);
        await ref.set(menuDto, { merge: true });
    }
}

export async function editPost(prevState: any, formData: FormData) {
    const postDto = {
        menuPath: formData.get("menuPath"),
        subMenuPath: formData.get("subMenuPath"),
        content: formData.get("content")
    }
    const id = formData.get('id');

    if (typeof id === "string"){
        let ref = id === "create"
         ? admin.firestore().collection('posts').doc()
         : admin.firestore().collection('posts').doc(id)

        try {
            await ref.set(postDto, {merge: true})
            return {message: 'success'}

        } catch(err) {
            return {message: 'error'}
        }
    }
}
