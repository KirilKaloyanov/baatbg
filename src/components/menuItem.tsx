"use client";

import { AnimatePresence, motion } from "framer-motion";
import CustomLink from "./customLink";
import { PostsMetaDTO } from "@/interfaces/admin/PostsDTO";
import { MenuDTO } from "@/interfaces/admin/MenuDTO";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
    return () => console.log('destroy', item.id)
  }, []);

  return (
    <div className="mt-10">

      <div className="flex justify-end md:justify-start">

        {pathname !== `/${locale}/${item.path}` ? (
          <CustomLink href={`/${locale}/${item.path}`}>
            <h6 className="mb-4 hover:text-primary">{item.label[locale]}</h6>
          </CustomLink>
        ) : (
          <h6 className="mb-4 text-primary">{item.label[locale]}</h6>
        )}

        {subItems.length > 0 && (
          <div
            className="flex md:hidden pt-3 pl-3 cursor-pointer p-1"
            onClick={() =>
              isMenuItemOpen ? openMenuItem(null) : openMenuItem(item.id)
            }
          >
            <div
              className={`w-4 h-0.5 bg-background rounded ${
                (isMenuItemOpen ? "-" : "") + "rotate-45 transition"
              }`}
            ></div>
            <div
              className={`w-4 h-0.5 -ml-1.5 bg-background rounded ${
                (isMenuItemOpen ? "" : "-") + "rotate-45 transition"
              }`}
            ></div>
          </div>
        )}
      </div>

      {subItems && (
        <motion.div
          className="overflow-hidden h-0"
          animate={{ height: isMenuItemOpen ? "auto" : 0 }}
        >

          {subItems.map((si: PostsMetaDTO) => (
            <div key={si.id}>
              {pathname !== `/${locale}/${si.menuPath}/${si.subMenuPath}` ? (
                <CustomLink
                  href={`/${locale}/${si.menuPath}/${si.subMenuPath}`}
                >
                  <span className="hover:text-primary">
                    {si.heading[locale]}
                  </span>
                </CustomLink>
              ) : (
                <span className="text-primary">{si.heading[locale]}</span>
              )}
            </div>
          ))}

        </motion.div>
      )}

    </div>
  );
}
