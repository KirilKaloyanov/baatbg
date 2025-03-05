import { getAllPostsByMenuId } from "@services/postsService";
import CustomLink from "@components/customLink";

export default async function MainMenu({
  params,
}: {
  params: Promise<{ menu: string; locale: string }>;
}) {
  const { menu, locale } = await params;

  const items = await getAllPostsByMenuId(menu);
  return (
    <>
      <h1>.:{menu}:. Main menu gallery</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <CustomLink
            href={`/${locale}/${item.data.menuPath}/${item.data.subMenuPath}`}
          >
            {item.data.heading[locale]}
          </CustomLink>
        </div>
      ))}
    </>
  );
}
