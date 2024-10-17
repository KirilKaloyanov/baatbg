"/view/[postId]/edit"

import { getTinyMceApiKey } from "@services/tinymceApiKeyService";
import {
  getContentById,
  saveNewContent,
  updateContent,
} from "@services/firestoreService";
import PostForm from "@components/forms/postForm";

export default async function EditPost( { params }: {params: {postId: string}}) {
  const { postId } = params;
  let item;

  if (postId) {
    const data = await getContentById(postId);
    item = {itemId: postId, data};
  }

  const apiKey = await getTinyMceApiKey();


    if (apiKey) return <PostForm apiKey={apiKey} item={item}/>
    return <h1> Waiting for editor key</h1>

}
