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
        if (id === "create" && typeof path == "string") {
            id = path;
        } 
        const ref = await admin.firestore().collection("menu").doc(id);
        const dataSnapSHot = await ref.set(menuDto, { merge: true });
    }



    // console.log("prevState", prevState);

}

