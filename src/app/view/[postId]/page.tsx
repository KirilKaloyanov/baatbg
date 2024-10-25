"/view/[postId]"

import { getContentById } from "../../../services/firestoreService";

export default async function ViewPost({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;

  const data = await getContentById("posts", postId);

  // if (!data) return <div>No content</div>

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
    ></div>
  );
}
