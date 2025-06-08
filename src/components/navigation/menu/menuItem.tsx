"use client";

import { AnimatePresence, motion } from "framer-motion";
import CustomLink from "../customLink";
import { PostMetaDTO } from "@/interfaces/admin/PostsDTO";
import { MenuDTO } from "@/interfaces/admin/MenuDTO";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AnimatedChevron from "./animatedChevron";

export default function MenuItem({
  item,
  subItems,
  locale,
  isMenuItemOpen,
  openMenuItem,
}: {
  item: MenuDTO;
  subItems: PostMetaDTO[];
  locale: string;
  isMenuItemOpen: boolean;
  openMenuItem: (id: string | null) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.split("/")[3] == item.path) {
      openMenuItem(item.id);
    }
    // return () => console.log('destroy', item.id)
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-end md:justify-start">

        <h4>{item.label[locale]}</h4>

        {/* {pathname !== `/${locale}/posts/${item.path}` ? (
          // Link to menuPath
          <CustomLink href={`/${locale}/posts/${item.path}`}>
            <h4 className="hover:text-accent-100">{item.label[locale]}</h4>
          </CustomLink>
        ) : (
          // Activated menuPath
          <h4 className="text-accent-100">{item.label[locale]}</h4>
        )} */}

        {subItems.length < 1 ? (
          //Empty space where no subMenuPaths for this menuPath
          <div className="w-12 md:w-0"></div>
        ) : (
          <AnimatedChevron
            isMenuItemOpen={isMenuItemOpen}
            openMenuItem={openMenuItem}
            itemId={item.id}
          />
        )}
      </div>

      {subItems && (
        // subMenuPaths collapsible
        <motion.div
          className="overflow-hidden h-0"
          animate={{ height: isMenuItemOpen ? "auto" : 0 }}
        >
          {subItems.map((si: PostMetaDTO) => (
            //
            <div key={si.id} className="p-4 pr-12 md:p-0 md:py-3 text-right md:text-left">
              {pathname !== `/${locale}/posts/${si.menuPath}/${si.subMenuPath}` ? (
                // Link to subMenuPath
                <CustomLink
                  href={`/${locale}/posts/${si.menuPath}/${si.subMenuPath}`}
                >
                  <span className="hover:text-accent-100">
                    {si.heading[locale]}
                  </span>
                </CustomLink>
              ) : (
                // Activated subMenuPath
                <span className="text-accent-100">{si.heading[locale]}</span>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
