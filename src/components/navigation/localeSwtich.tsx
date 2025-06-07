"use client";

import { useLoader } from "@context/LoaderContext";
import { usePathname, useRouter } from "../../i18n/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const languages = [
  { code: "bg", label: "BG" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitch({ locale }) {
  const [ currentLocale, setCurrentLocale ] = useState(locale)
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useLoader();

  const switching = () => {
    const nextLocale = locale === "en" ? "bg" : "en";
    setCurrentLocale(nextLocale);
    startNavigation(() => {
      router.replace(pathname, { locale: nextLocale });
    });

  };

  return (
    <>
      <div
        className="relative inline-flex items-center justify-end w-20 h-10 py-1 font-medium text-sm bg-stone-300 rounded-full cursor-pointer"
        onClick={switching}
      >
        <span className="w-1/2 text-center z-10">{languages[0].label}</span>
        <span className="w-1/2 text-center z-10">{languages[1].label}</span>

        <motion.div
          layout  
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`absolute top-0 left-0 w-1/2 h-full bg-stone-50 rounded-full z-0 border-2 border-stone-300 ${
            currentLocale === "en" ? "translate-x-full" : ""
          }`}
        />
      </div>
    </>
  );
}
