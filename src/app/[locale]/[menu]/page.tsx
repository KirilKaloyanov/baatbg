import { getAllPostsByMenuId } from "@services/postsService";
import Link from "next/link";

export default async function MainMenu({
  params,
}: {
  params: Promise<{ menu: string, locale: string }>;
}) {
  const { menu, locale } = await params;
  console.log(locale)

  const items = await getAllPostsByMenuId(menu);
  return (
    <>
      <h1>.:{menu}:. Main menu gallery</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <Link href={`/${item.data.menuPath}/${item.data.subMenuPath}`}>
            {item.data.subMenuPath}
          </Link>
        </div>
      ))}
    </>
  );
}
