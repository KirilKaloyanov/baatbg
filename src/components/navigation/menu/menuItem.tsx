"use client";

import { AnimatePresence, motion } from "framer-motion";
import CustomLink from "../customLink";
import { PostsMetaDTO } from "@/interfaces/admin/PostsDTO";
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
  subItems: PostsMetaDTO[];
  locale: string;
  isMenuItemOpen: boolean;
  openMenuItem: (id: string | null) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.split("/")[2] == item.path) {
      openMenuItem(item.id);
    }
    // return () => console.log('destroy', item.id)
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-end md:justify-start">
        {pathname !== `/${locale}/${item.path}` ? (
          // Link to menuPath
          <CustomLink href={`/${locale}/${item.path}`}>
            <h6 className="hover:text-primary">{item.label[locale]}</h6>
          </CustomLink>
        ) : (
          // Activated menuPath
          <h6 className="text-primary">{item.label[locale]}</h6>
        )}

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
          {subItems.map((si: PostsMetaDTO) => (
            //
            <div key={si.id} className="p-4 md:p-1 text-right md:text-left">
              {pathname !== `/${locale}/${si.menuPath}/${si.subMenuPath}` ? (
                // Link to subMenuPath
                <CustomLink
                  href={`/${locale}/${si.menuPath}/${si.subMenuPath}`}
                >
                  <span className="hover:text-primary">
                    {si.heading[locale]}
                  </span>
                </CustomLink>
              ) : (
                // Activated subMenuPath
                <span className="text-primary">{si.heading[locale]}</span>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
