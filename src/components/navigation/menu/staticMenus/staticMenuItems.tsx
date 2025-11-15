import AnimatedChevron from "../animatedChevron";
import CustomLink from "../../customLink";
import { usePathname } from "next/navigation";
import RegionsMap from "./regionsMap";
import StaticMenuItem from "./staticMenuItem";

export default function StaticMenuItems({
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
                <h4 className="hover:text-accent-100">
                  {locale == "bg" ? "Региони" : "Regions"}
                </h4>
              </CustomLink>
            ) : (
              <h4 className="text-accent-100">
                {locale == "bg" ? "Региони" : "Regions"}
              </h4>
            )}

            <AnimatedChevron
              isMenuItemOpen={expandedMenuItemId === "regions"}
              openMenuItem={setExpandedMenuItemId}
              itemId="regions"
            />
          </div>
        </div>

        <div className="md:hidden">
          <RegionsMap expandedMenuItemId={expandedMenuItemId} locale={locale} />
        </div>

        <StaticMenuItem locale={locale} path={"lodges"} />
        <StaticMenuItem locale={locale} path={"tours"} />
        <StaticMenuItem locale={locale} path={"members"} />
      </div>

      <div className="hidden md:block">
        <RegionsMap expandedMenuItemId={expandedMenuItemId} locale={locale} />
      </div>
    </>
  );
}
