"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useLoader } from "@/context/LoaderContext";

import CustomLink from "../customLink";
import DynamicMenu from "./DynamicMenu";

import { PostMetaDTO } from "@/interfaces/PostsDTO";
import { MenuDTO } from "@/interfaces/MenuDTO";

import logo from "@images/logo/logo_baat.png";

export default function Menu({
  isMenuOpen,
  setMenuOpen,
  menuItems,
  subMenuItems,
  locale,
}: {
  isMenuOpen: boolean;
  setMenuOpen: (newState: boolean) => void;
  menuItems: MenuDTO[] | null;
  subMenuItems: PostMetaDTO[] | null;
  locale: string;
}) {
  const [activeMenuItemId, setActiveMenuItemId] = useState<string | null>(
    null,
  );

  const isLoading = useLoader();

  useEffect(() => {
    setMenuOpen(false);
    setActiveMenuItemId(null);
  }, [isLoading]);

  return (
    <>
      {/* Hamburger element */}
      <div onClick={() => setMenuOpen(true)} className="size-8 cursor-pointer">
        <div className="bg-base-900 my-2 h-1 w-8 rounded"></div>
        <div className="bg-base-900 my-2 h-1 w-8 rounded"></div>
        <div className="bg-base-900 h-1 w-8 rounded"></div>
      </div>

      {/* Menu animation container */}
      <AnimatePresence>
        {isMenuOpen ? (
            <motion.div
              className="bg-base-900 text-background absolute top-6 left-0 z-10 max-h-screen w-full overflow-y-auto py-2 md:overflow-y-hidden"
              layout
              initial={{ height: 0 }}
              animate={{ height: "fit-content" }}
              exit={{ height: 0, transition: { duration: 0.1 } }}
            >
              {/* Menu container */}
              <div className="container m-auto flex items-center justify-between px-2 md:mt-2">
                {/* Link to home */}
                <CustomLink href={"/" + locale}>
                  <Image
                    className="grayscale invert"
                    src={logo}
                    alt="Logo image of BAAT"
                    height={60}
                  />
                </CustomLink>

                {/* Close button */}
                <div
                  onClick={() => setMenuOpen(false)}
                  className="relative size-12 cursor-pointer"
                >
                  <div className="bg-background absolute top-5 left-3.5 h-1 w-9 rotate-45 rounded"></div>
                  <div className="bg-background absolute top-5 left-3.5 h-1 w-9 -rotate-45 rounded"></div>
                </div>
              </div>

              {/* Navigation container */}
              <nav className="container m-auto px-6 pb-18">


                {/* Dynamic menus from DB */}
                <DynamicMenu
                  menuItems={menuItems}
                  subMenuItems={subMenuItems}
                  locale={locale}
                  activeMenuItemId={activeMenuItemId}
                  setActiveMenuItemId={setActiveMenuItemId}
                  regionsExpandable={true}
                />
              </nav>
            </motion.div>
         ) : null}
      </AnimatePresence>
    </>
  );
}
