"/view/[postId]/edit";

import dynamic from "next/dynamic";
import { getContentById } from "@services/firestoreService";

export default async function EditPost({
  params,
}: {
  params: { postId: string };
}) {
  const PostForm = dynamic(() => import("@components/forms/postForm"), {
    ssr: false,
  });

  const { postId } = params;
  let item;
  
  if (postId) {
    const data = await getContentById("posts", postId);
    item = { itemId: postId, data };
  }

 return <PostForm item={item} />;
  // return <h1> Waiting for editor key</h1>;
}
