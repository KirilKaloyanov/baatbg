"use server";
import { admin } from "@firebaseAdminConfig";
import { redirect } from "next/navigation";

export async function editMenu(prevState: any, formData: FormData) {
  let id = formData.get("id");
  const name = formData.get("name");
  const position = formData.get("position");
  const path = formData.get("path");

  const parsedPosition = parseInt(position as string);
  const menuDto = { name, position: parsedPosition, path };

  if (typeof id == "string") {
    if (id == "create" && typeof path == "string") {
      id = path;
    }
    const ref = await admin.firestore().collection("menu").doc(id);
    await ref.set(menuDto, { merge: true });
  }
}

export async function editPost( formData
) {
  const postDto = {
    menuPath: formData.menuPath,
    subMenuPath: formData.subMenuPath,
    content: formData.content,
  };
  const id = formData.id;
  let mt;
  if (typeof id === "string") {
    let ref =
      id === "create"
        ? admin.firestore().collection("posts").doc()
        : admin.firestore().collection("posts").doc(id);

    try {
      mt = await ref.set(postDto, { merge: true });
      console.log("starving")
      return postDto;
    } catch (err) {
      return { message: "error" };
    }
  }
//   if (mt.writeTime) {
//     redirect("/dashboard");
//   }
}
