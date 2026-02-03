"use client";

import Image from "next/image";
import fbLogo from "@icons/fb.svg";
import ytLogo from "@icons/youtube.svg";
import logo from "@images/logo/logo_baat.png";

import DynamicMenu from "./menu/DynamicMenu";
import CustomLink from "./customLink";

import { MenuDTO } from "@/interfaces/MenuDTO";
import { PostMetaDTO } from "@/interfaces/PostsDTO";
import RegionsMap from "./menu/staticMenus/regionsMap";

export default function Footer({
  locale,
  menuItems,
  subMenuItems,
}: {
  locale: string;
  menuItems: MenuDTO[] | null;
  subMenuItems: PostMetaDTO[] | null;
}) {
  return (
    <footer className="bg-base-900 text-background mt-8 ">
      <div className="container mx-auto xl:flex xl:gap-10">
          <div className=" hidden lg:block flex-3">
            <DynamicMenu
              locale={locale}
              menuItems={menuItems}
              subMenuItems={subMenuItems}
              activeMenuItemId={null}
              setActiveMenuItemId={() => null}
              regionsExpandable={false}
            />
          </div>
          <div className=" mt-10 px-6 flex-1">
            <CustomLink href={"/" + locale}>
              <Image
                className="grayscale invert"
                src={logo}
                alt="Logo image of BAAT"
                height={60}
              />
            </CustomLink>
            
            <div className="my-6">
                <p className="mt-4 text-sm">
                  {locale === "bg" ? (
                    <>
                      София, бул. "Ал. Стамболийски" 20В
                      <br />
                      0897 033 860 - Елеонора Йосифова (Председател)
                      <br />
                      baatbg@gmail.com
                      <br />
                      IBAN: BG22BPBI79421042396901
                    </>
                  ) : (
                    <>
                      Sofia, "Al. Stamboliyski" Blvd. 20V
                      <br />
                      0897 033 860 - Eleonora Yosifova (Chairperson)
                      <br />
                      baatbg@gmail.com
                      <br />
                      IBAN: BG22BPBI79421042396901
                    </>
                  )}
                </p>
            </div>

            <div className="flex gap-4 mb-10">
              <a
                href="https://www.facebook.com/BAATBulgaria/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="cursor-pointer"
                  src={fbLogo}
                  alt="Icon"
                  height={40}
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UC-HTJkh-ktMiw6UBO8FjV_w"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="cursor-pointer"
                  src={ytLogo}
                  alt="Icon"
                  height={40}
                />
              </a>
            </div>
          </div>
      </div>
      <div className="lg:block">
        <RegionsMap activeMenuItemId={"regions"} locale={locale} />
        <p className="text-center py-4 text-sm">© {new Date().getFullYear()} BAAT Bulgaria. All rights reserved.</p>
      </div>
    </footer>
  );
}
