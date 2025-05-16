import CustomLink from "../../customLink";
import { usePathname } from "next/navigation";

export default function StaticMenuItem({ locale, path }: { locale: string, path: string }) {

  const pathname = usePathname();
  
  const labels = {
    tours: {
      bg: "Пътувания",
      en: "Tours"
    },
    lodges: {
      bg: "Къщи за гости",
      en: "Guesthouses"
    },
    members: {
      bg: "Членове",
      en: "Memebrs"
    },
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end md:justify-start">
        {pathname !== `/${locale}/${path}` ? (
          <CustomLink href={`/${locale}/${path}`}>
            <h6 className="hover:text-primary">
              {labels[path][locale]}
            </h6>
          </CustomLink>
        ) : (
          <h6 className="text-primary">{labels[path][locale]}</h6>
        )}
      </div>
    </div>
  );
}
