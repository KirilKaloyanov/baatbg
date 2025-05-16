import AnimatedChevron from "../animatedChevron";
import CustomLink from "../../customLink";
import { usePathname } from "next/navigation";
import RegionsMap from "./regionsMap";
import StaticMenuItem from "./staticMenuItem";

export default function TopMenuItems({
  locale,
  expandedMenuItemId,
  setExpandedMenuItemId,
}: {
  locale: string;
  expandedMenuItemId: string | null;
  setExpandedMenuItemId: (id: string | null) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="md:grid md:grid-cols-4">
        <div className="mt-10">
          <div className="flex justify-end md:justify-start">
            {pathname !== `/${locale}/regions` ? (
              <CustomLink href={`/${locale}/regions`}>
                <h6 className="hover:text-primary">
                  {locale == "bg" ? "Региони" : "Regions"}
                </h6>
              </CustomLink>
            ) : (
              <h6 className="text-primary">
                {locale == "bg" ? "Региони" : "Regions"}
              </h6>
            )}

            <AnimatedChevron
              isMenuItemOpen={expandedMenuItemId === "regions"}
              openMenuItem={setExpandedMenuItemId}
              itemId="regions"
            />
          </div>
        </div>

        <div className="md:hidden">
          <RegionsMap expandedMenuItemId={expandedMenuItemId} />
        </div>

        <StaticMenuItem locale={locale} path={"lodges"} />
        <StaticMenuItem locale={locale} path={"tours"} />
        <StaticMenuItem locale={locale} path={"members"} />
      </div>

      <div className="hidden md:block">
        <RegionsMap expandedMenuItemId={expandedMenuItemId} />
      </div>
    </>
  );
}
