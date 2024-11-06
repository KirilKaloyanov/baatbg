import { getAllPostsByMenuId } from "@services/postsService";
import Link from "next/link";

export default async function MainMenu({
  params,
}: {
  params: { menu: string };
}) {
  const { menu } = await params;

  const items = await getAllPostsByMenuId(menu);
  return (
    <>
      <h1>_{menu}+ Main menu gallery</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <Link href={`/${item.data.menuId}/${item.data.subMenuId}`}>
            {item.data.subMenuId}
          </Link>
        </div>
      ))}
    </>
  );
}
