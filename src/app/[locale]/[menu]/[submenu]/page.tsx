import { getPostBySubMenuId, getPostMetaDataByPostId } from "@services/postsService";
import './submenu.css';
import Video from "@/components/video/video";
import { PostDTO, PostMetaDTO } from "@/interfaces/admin/PostsDTO";

export default async function SubMenu({
  params,
}: {
  params: Promise<{ menu: string; submenu: string; locale: string }>;
}) {
  const { submenu, locale } = await params;

  const data: PostDTO | null = await getPostBySubMenuId(submenu);

  return (
    <>
      <h1>.:{submenu}:. Submenu item</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data?.text[locale] || "No content" }}
      ></div>
      
      { data?.linkVideo &&
      <Video videoId={data?.linkVideo} />}
    </>
  );
}


export async function generateMetadata({
  params
} : {
  params: Promise<{ submenu: string, locale: string }>;
}) {
  const { submenu, locale } = await params;

  const postData: PostMetaDTO | null = await getPostMetaDataByPostId(submenu);

  const metadata = {
    title: `${postData?.heading[locale] || ''}`,
  };
  return metadata;
}