"use client";

import { useLoader } from "@context/LoaderContext";
import { usePathname, useRouter } from "../i18n/navigation";
import { motion } from "framer-motion";

const languages = [
  { code: "bg", label: "BG" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitch({ locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useLoader();

  const switching = () => {
    const nextLocale = locale === 'en' ? 'bg' : 'en'
    startNavigation(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <>
      <div
        className="relative inline-flex items-center justify-end w-20 h-10 px-2 py-1 font-medium text-sm bg-gray-200 rounded-md cursor-pointer"
        onClick={switching}
      >
        <span className="w-1/2 text-center z-10">{languages[0].label}</span>
        <span className="w-1/2 text-center z-10">{languages[1].label}</span>

        <motion.div
          layout
          transition={{type: 'spring', stiffness: 300, damping: 30}}
          className={`absolute top-0 left-0 w-1/2 h-full bg-stone-500 rounded-md z-0 ${
            locale === 'bg' ? 'translate-x-full' : ''
          }`}
        />
      </div>

    </>
  );
}
