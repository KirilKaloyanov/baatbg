"use client";

import { motion } from "framer-motion";
import RegionsMap from "./navigation/menu/staticMenus/regionsMap";
import Button from "./button";

interface HomeRegionsProps {
  locale: string;
}

export const HomeRegions = ({ locale }: HomeRegionsProps) => {
  const isEn = locale === "en";

  const heading = isEn ? "Explore the Regions" : "Обиколка на регионите";

  /**
   * Animation: Slide from Top
   * Using the same cubic-bezier for a sophisticated "boutique" feel.
   */
  const slideFromTop = {
    initial: { y: "100%", opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { 
      duration: 1.2, 
      delay: 1,
      ease: [0.16, 1, 0.3, 1] as const 
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-100  bg-white overflow-hidden">
      
      {/* LEFT CONTAINER: Heading sliding from Top */}
      <div className="flex flex-col items-start justify-around p-8 lg:p-16 overflow-hidden">
        <motion.h2
          {...slideFromTop}
          className="text-4xl lg:text-5xl xl:text-7xl leading-[0.85] tracking-tighter uppercase"
        >
          {heading}
        </motion.h2>
        <motion.div {...slideFromTop}>
            <a href={`${locale}/regions`}>
                <Button text={isEn ? "All regions" : "Всички региони"} classes={"px-8 py-3 lg:px-12 lg:py-4 font-bold lg:text-xl "} /> 
            </a>
        </motion.div>
      </div>

      {/* RIGHT CONTAINER: Empty */}
      <div className="bg-white">
        <RegionsMap  activeMenuItemId={"regions"} locale={locale} />
      </div>

    </div>
  );
};