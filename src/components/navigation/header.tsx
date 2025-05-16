"use client";

import { useState } from "react";
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
    <motion.header
      className="fixed w-full top-0 shadow-sm bg-secondary/90"
      animate={{ translateY: scrollDirection == "down" && !isOpen ? "-95px" : 0 }}
    >
      <div className="container m-auto flex justify-between items-center p-2 md:py-4">
        <CustomLink href={"/" + locale}>
          <Image src={logo} alt="Logo image of BAAT" height={60} />
        </CustomLink>

        <div className="flex gap-5">
          <LanguageSwitch locale={locale} />
          <Menu isOpen={isOpen} toggleMenu={toggleMenu} items={items} subItems={subItems} locale={locale} />
        </div>
      </div>
    </motion.header>
  );
}
