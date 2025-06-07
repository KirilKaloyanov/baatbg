"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useLoader } from "@/context/LoaderContext";

import MenuItem from "./menuItem";
import CustomLink from "../customLink";

import { PostMetaDTO } from "@/interfaces/admin/PostsDTO";
import { MenuDTO } from "@/interfaces/admin/MenuDTO";

import logo from "@images/logo/logo_baat.png";
import StaticMenuItems from "./staticMenus/staticMenuItems";

export default function Menu({
  isOpen,
  toggleMenu,
  items,
  subItems,
  locale,
}: {
  isOpen: boolean;
  toggleMenu: (newState: boolean) => void;
  items: MenuDTO[] | null;
  subItems: PostMetaDTO[] | null;
  locale: string;
}) {
  const [expandedMenuItemId, setExpandedMenuItemId] = useState<string | null>(
    null,
  );

  const isLoading = useLoader();

  const filterSubItemsByItem = (item: MenuDTO) => {
    if (subItems == null) return [];
    return subItems.filter((si) => si.menuPath == item.path);
  };

  useEffect(() => {
    toggleMenu(false);
    setExpandedMenuItemId(null);
  }, [isLoading]);

  return (
    <>
      {/* Hamburger element */}
      <div onClick={() => toggleMenu(true)} className="size-8 cursor-pointer">
        <div className="bg-base-900 my-2 h-1 w-8 rounded"></div>
        <div className="bg-base-900 my-2 h-1 w-8 rounded"></div>
        <div className="bg-base-900 h-1 w-8 rounded"></div>
      </div>

      {/* Menu animation container */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="bg-base-900 text-background absolute top-6 left-0 z-10 max-h-[100vh] w-full overflow-y-auto py-2 md:overflow-y-hidden"
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
                onClick={() => toggleMenu(false)}
                className="relative size-12 cursor-pointer"
              >
                <div className="bg-background absolute top-5 left-3.5 h-1 w-9 rotate-45 rounded"></div>
                <div className="bg-background absolute top-5 left-3.5 h-1 w-9 -rotate-45 rounded"></div>
              </div>
            </div>

            {/* Navigation container */}
            <nav className="container m-auto px-6 pb-18">
              {/* Default menus */}
              <StaticMenuItems
                locale={locale}
                expandedMenuItemId={expandedMenuItemId}
                setExpandedMenuItemId={setExpandedMenuItemId}
              />

              {/* Dynamic menus from DB */}
              <div className="md:grid md:grid-cols-4">
                {items &&
                  items.map((i: MenuDTO) => (
                    <div key={i.id}>
                      <div className="block md:hidden">
                        <MenuItem
                          item={i}
                          subItems={filterSubItemsByItem(i)}
                          locale={locale}
                          isMenuItemOpen={expandedMenuItemId === i.id}
                          openMenuItem={setExpandedMenuItemId}
                        />
                      </div>
                      <div className="hidden md:block">
                        <MenuItem
                          item={i}
                          subItems={filterSubItemsByItem(i)}
                          locale={locale}
                          isMenuItemOpen={true}
                          openMenuItem={setExpandedMenuItemId}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
