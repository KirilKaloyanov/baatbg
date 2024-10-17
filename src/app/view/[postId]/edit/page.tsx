import dynamic from "next/dynamic";
import { getTinyMceApiKey } from "@services/tinymceApiKeyService";
import {
  getContentById,
  saveNewContent,
  updateContent,
} from "@services/firestoreService";

export default async function EditPost( { params }: {params: {postId: string}}) {
  const TinyMCEditor = dynamic(() => import("@components/richEditor"), {
    ssr: false,
  });

  const { postId } = params;
  let item;

  if (postId) {
    const data = await getContentById(postId);
    item = {itemId: postId, data};
  }

  const apiKey = await getTinyMceApiKey();


    if (apiKey) return <TinyMCEditor apiKey={apiKey} item={item}/>
    return <h1> Waiting for editor key</h1>

}
