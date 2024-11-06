
"/view/[postId]"

import { getPostById } from "@services/postsService";

export default async function ViewPost({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;

  const data = await getPostById(postId);

  // if (!data) return <div>No content</div>

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
    ></div>
  );
}
