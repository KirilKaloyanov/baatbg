"use client";

import { motion } from "framer-motion";
import CustomLink from "../customLink";
import { PostMetaDTO } from "@/interfaces/PostsDTO";
import { MenuDTO } from "@/interfaces/MenuDTO";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AnimatedChevron from "./animatedChevron";

export default function MenuItem({
  menuItem,
  subMenuItems,
  currentLocale,
  isMenuItemOpen,
  openMenuItem,
}: {
  menuItem: MenuDTO;
  subMenuItems: PostMetaDTO[];
  currentLocale: string;
  isMenuItemOpen: boolean;
  openMenuItem: (id: string | null) => void;
}) {
  const currentPathname = usePathname();

  useEffect(() => {
    if (currentPathname.split("/")[3] == menuItem.path) {
      openMenuItem(menuItem.id);
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-end md:justify-start">

        <h4>{menuItem.label[currentLocale]}</h4>

        {subMenuItems.length < 1 ? (
          //Empty space where no subMenuItems for this menuItem
          <div className="w-12 md:w-0"></div>
        ) : (
          <AnimatedChevron
            isMenuItemOpen={isMenuItemOpen}
            setActiveMenuItemId={openMenuItem}
            menuItemId={menuItem.id}
          />
        )}
      </div>

      {subMenuItems && (
        // subMenuItems collapsible
        <motion.div
          className="overflow-hidden h-0"
          animate={{ height: isMenuItemOpen ? "auto" : 0 }}
        >
          {subMenuItems.map((subMenuItem: PostMetaDTO) => {
            // Construct pathlink from subMenuPath
            const pathlink = `/${currentLocale}/posts/${subMenuItem.menuPath}/${subMenuItem.subMenuPath}`;
            return <div key={subMenuItem.id} className="p-4 pr-12 md:p-0 md:py-3 text-right md:text-left">
              {currentPathname !== pathlink ? (
                // Link to subMenuPath
                <CustomLink
                  href={pathlink}
                >
                  <span className="hover:text-accent-100">
                    {subMenuItem.heading[currentLocale]}
                  </span>
                </CustomLink>
              ) : (
                // Activated subMenuPath
                <span className="text-accent-100">{subMenuItem.heading[currentLocale]}</span>
              )}
            </div>
})}
        </motion.div>
      )}
    </div>
  );
}
