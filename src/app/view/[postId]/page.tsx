"/view/[postId]"

import { getContentById } from "../../../services/firestoreService";

export default async function ViewPost({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;

  const data = await getContentById(postId);
  console.log(data);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data?.content || "No content" }}
    ></div>
  );
}
