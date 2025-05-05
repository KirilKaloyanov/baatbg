"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import MenuItem from "./menuItem";

import { PostsMetaDTO } from "@/interfaces/admin/PostsDTO";
import { MenuDTO } from "@/interfaces/admin/MenuDTO";

import { useLoader } from "@/context/LoaderContext";

import logo from "@images/logo/logo_baat.png";
import CustomLink from "./customLink";

export default function Menu({
  items,
  subItems,
  locale,
}: {
  items: MenuDTO[] | null;
  subItems: PostsMetaDTO[] | null;
  locale: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((current) => !current);

  const [openMenuItemId, setOpenMenuItemId] = useState<string | null>(null);

  const isLoading = useLoader();

  const filterSubItemsByItem = (item: MenuDTO) => {
    if (subItems == null) return [];
    return subItems.filter((si) => si.menuPath == item.path);
  };

  useEffect(() => {
    setIsOpen(false);
    setOpenMenuItemId(null);
  }, [isLoading]);

  return (
    <div>
      <div onClick={toggleMenu} className="size-8 cursor-pointer">
        <div className="my-2 w-8 h-1 rounded bg-foreground"></div>
        <div className="my-2 w-8 h-1 rounded bg-foreground"></div>
        <div className="w-8 h-1 rounded bg-foreground"></div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="pt-2 px-2 absolute left-0 top-0 w-full bg-foreground text-background z-10 overflow-hidden"
            layout
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0, transition: { duration: 0.1 } }}
          >
            <div className="mt-2 container m-auto flex justify-between items-center">
              <CustomLink href={'/' + locale}>
                <Image
                  className="grayscale invert"
                  src={logo}
                  alt="Logo image of BAAT"
                  height={60}
                />
              </CustomLink>
              <div
                onClick={toggleMenu}
                className="relative cursor-pointer size-12"
              >
                <div className="absolute left-4 rounded top-4.5 w-9 h-1 bg-background rotate-45"></div>
                <div className="absolute left-4 rounded top-4.5 w-9 h-1 bg-background -rotate-45"></div>
              </div>
            </div>
            <nav className="pb-18 container m-auto text-right md:text-left md:grid md:grid-cols-4">
              {items &&
                items.map((i: MenuDTO) => (
                  <div key={i.id}>
                    <div className="block md:hidden">
                      <MenuItem
                        item={i}
                        subItems={filterSubItemsByItem(i)}
                        locale={locale}
                        isMenuItemOpen={openMenuItemId === i.id}
                        openMenuItem={setOpenMenuItemId}
                      />
                    </div>
                    <div className="hidden md:block">
                      <MenuItem
                        item={i}
                        subItems={filterSubItemsByItem(i)}
                        locale={locale}
                        isMenuItemOpen={true}
                        openMenuItem={setOpenMenuItemId}
                      />
                    </div>
                  </div>
                ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
