"use client";

import AnimatedChevron from "../animatedChevron";
import CustomLink from "../../customLink";
import { usePathname } from "next/navigation";
import RegionsMap from "./regionsMap";
import StaticMenuItem from "./staticMenuItem";

export default function StaticMenuItems({
  locale,
  activeMenuItemId,
  setActiveMenuItemId,
  regionsExpandable,
}: {
  locale: string;
  activeMenuItemId: string | null;
  setActiveMenuItemId: (id: string | null) => void;
  regionsExpandable: boolean;
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

            {regionsExpandable && (
              <AnimatedChevron
                isMenuItemOpen={activeMenuItemId === "regions"}
                setActiveMenuItemId={setActiveMenuItemId}
                menuItemId="regions"
              />
            )}
          </div>
        </div>

        <div className="md:hidden">
          <RegionsMap activeMenuItemId={activeMenuItemId} locale={locale} classes=" md:w-1/3 md:mx-auto" />
        </div>

        <StaticMenuItem locale={locale} path={"lodges"} />
        <StaticMenuItem locale={locale} path={"tours"} />
        <StaticMenuItem locale={locale} path={"members"} />
      </div>

      <div className="hidden md:block">
        <RegionsMap activeMenuItemId={activeMenuItemId} locale={locale} classes=" md:w-1/3 md:mx-auto" />
      </div>
    </>
  );
}
