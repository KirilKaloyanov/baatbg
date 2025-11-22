import { getPostBySubMenuId, getPostMetaDataByPostId } from "@services/postsService";
import Video from "@/app/[locale]/posts/[menu]/[submenu]/_video/video";
import { PostDTO, PostMetaDTO } from "@/interfaces/PostsDTO";

export default async function SubMenu({
  params,
}: {
  params: Promise<{ menu: string; submenu: string; locale: string }>;
}) {
  const { submenu, locale } = await params;

  const data: PostDTO | null = await getPostBySubMenuId(submenu);

  if (!data) return null;

  return (
    <>
      <h1 className="mt-8">{data.heading[locale]}</h1>
      <div
        className="my-8 lg:columns-2 gap-10 xl:gap-20"
        dangerouslySetInnerHTML={{ __html: data.text[locale] || "No content" }}
      ></div>
      
      { data.linkVideo &&
      <Video videoId={data.linkVideo} />}
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
    title:postData?.heading[locale] || (locale === "bg" ? "БААТ" : "BAAT"),
  };
  return metadata;
}