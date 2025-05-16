"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useLoader } from "@/context/LoaderContext";

import MenuItem from "./menuItem";
import CustomLink from "../customLink";

import { PostsMetaDTO } from "@/interfaces/admin/PostsDTO";
import { MenuDTO } from "@/interfaces/admin/MenuDTO";

import logo from "@images/logo/logo_baat.png";
import TopMenuItems from "./topMenu/topMenuItems";

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
  subItems: PostsMetaDTO[] | null;
  locale: string;
}) {
  const [expandedMenuItemId, setExpandedMenuItemId] = useState<string | null>(
    null
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
        <div className="my-2 w-8 h-1 rounded bg-foreground"></div>
        <div className="my-2 w-8 h-1 rounded bg-foreground"></div>
        <div className="w-8 h-1 rounded bg-foreground"></div>
      </div>

      {/* Menu animation container */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="p-2 absolute left-0 top-0 w-full bg-foreground text-background z-10 max-h-[100vh] overflow-y-auto md:overflow-hidden"
            layout
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0, transition: { duration: 0.1 } }}
          >
            {/* Menu container */}
            <div className="md:mt-2 md:px-2 container m-auto flex justify-between items-center">
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
                className="relative cursor-pointer size-12"
              >
                <div className="absolute left-3 rounded top-6 w-9 h-1 bg-background rotate-45"></div>
                <div className="absolute left-3 rounded top-6 w-9 h-1 bg-background -rotate-45"></div>
              </div>
            </div>

            {/* Navigation container */}
            <nav className="pb-18 container m-auto">
              {/* Default menus */}
                <TopMenuItems
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
