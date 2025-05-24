import CustomLink from "../../customLink";
import { usePathname } from "next/navigation";

export default function StaticMenuItem({
  locale,
  path,
}: {
  locale: string;
  path: string;
}) {
  const pathname = usePathname();

  const labels = {
    tours: {
      bg: "Пътувания",
      en: "Tours",
    },
    lodges: {
      bg: "Къщи за гости",
      en: "Guesthouses",
    },
    members: {
      bg: "Членове",
      en: "Members",
    },
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end md:justify-start">
        {pathname !== `/${locale}/${path}` ? (
          <CustomLink href={`/${locale}/${path}`}>
            <h4 className="hover:text-accent-100">{labels[path][locale]}</h4>
          </CustomLink>
        ) : (
          <h4 className="text-accent-100">{labels[path][locale]}</h4>
        )}
        <div className="w-12 md:w-0"></div>
      </div>
    </div>
  );
}
