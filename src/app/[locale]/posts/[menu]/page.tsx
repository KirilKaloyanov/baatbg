import { getAllPostsByMenuId } from "@services/postsService";
import CustomLink from "@/components/navigation/customLink";
import { getMenuById } from "@/services/menuService";
import { MenuDTO } from "@/interfaces/MenuDTO";

export default async function MainMenu({
  params,
}: {
  params: Promise<{ menu: string; locale: string }>;
}) {
  const { menu, locale } = await params;

  const items = await getAllPostsByMenuId(menu);
  return (
    <>
      <h1 className="text-3xl">.:{menu}:. Main menu gallery</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <CustomLink
            href={`/${locale}/posts/${item.menuPath}/${item.subMenuPath}`}
          >
            {item.heading[locale]}
          </CustomLink>
        </div>
      ))}
    </>
  );
}

export async function generateMetadata({
  params
} : {
  params: Promise<{ menu: string, locale: string }>;
}) {
  const { menu, locale } = await params;

  const menuData: MenuDTO | null = await getMenuById(menu);

  const metadata = {
    title: `${menuData?.label[locale] || ''}`,
  };
  return metadata;
}
