import dynamic from "next/dynamic";
import { getTinyMceApiKey } from "@services/tinymceApiKeyService";

export default async function EditPost( { params }: {params: {postId: string}}) {
  const TinyMCEditor = dynamic(() => import("@components/richEditor"), {
    ssr: false,
  });

  const { postId } = params;

  const apiKey = await getTinyMceApiKey();

    if (apiKey) return <TinyMCEditor apiKey={apiKey} itemId={postId}/>
    return <h1> Waiting for editor key</h1>

}
