"use client";

import { useState } from "react";
import Portal from "./portal";
import Image from "next/image";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import Menu from "./menu/menu";
import LanguageSwitch from "./localeSwtich";
import CustomLink from "./customLink";

import logo from "@images/logo/logo_baat.png";

export default function Header({ locale, items, subItems }) {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("up");

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY.getPrevious() || 0);
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = (newState: boolean) => setIsOpen(newState);

  return (
    <Portal key="header-portal">
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-stone-500/30 backdrop-blur-xs transition-all"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <motion.header
        className="fixed -top-6 w-full bg-stone-200 shadow-sm"
        animate={{
          translateY: scrollDirection == "down" && !isOpen ? "-120px" : 0,
        }}
      >
        <div className="container m-auto flex items-center justify-between px-2 pt-8 pb-2 md:pt-10 md:pb-4">

          <nav className="hidden space-x-8 lg:flex flex-1 mt-2">
            <CustomLink
              href={`/${locale}/regions`}
              className="hover:text-accent-100"
            >
              <h5>{locale === "bg" ? "Региони" : "Regions"}</h5>
            </CustomLink>
            <CustomLink
              href={`/${locale}/lodges`}
              className="hover:text-accent-100"
            >
              <h5>{locale === "bg" ? "Къщи за гости" : "Guesthouses"}</h5>
            </CustomLink>
            <CustomLink
              href={`/${locale}/tours`}
              className="hover:text-accent-100"
            >
              <h5>{locale === "bg" ? "Пътувания" : "Tours"}</h5>
            </CustomLink>
            <CustomLink
              href={`/${locale}/members`}
              className="hover:text-accent-100"
            >
              <h5>{locale === "bg" ? "Членове" : "Members"}</h5>
            </CustomLink>
          </nav>

          <CustomLink href={"/" + locale}>
            <Image src={logo} alt="Logo image of BAAT" height={60} />
          </CustomLink>

          <div className="flex gap-5 flex-1 justify-end">
            <LanguageSwitch locale={locale} />
            <Menu
              isOpen={isOpen}
              toggleMenu={toggleMenu}
              items={items}
              subItems={subItems}
              locale={locale}
            />
          </div>
        </div>
      </motion.header>
    </Portal>
  );
}
