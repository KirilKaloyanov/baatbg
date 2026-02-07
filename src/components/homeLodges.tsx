"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Button from "./button";
import LodgeCard from "./cards/lodge-card";
import { LodgeBaseDTO } from "@/interfaces/LodgeDTO";

// Dynamically import MapContainer to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

interface HomeLodgesProps {
  locale: string;
  lodges: LodgeBaseDTO[] | null;
}

export const HomeLodges = ({ locale, lodges }: HomeLodgesProps) => {
  const isEn = locale === "en";
  const heading = isEn ? "Responsible hospitality" : "Гостоприемство с отговорност";
  const buttonText = isEn ? "Guesthouses" : "Къщи за гости";
  const linkHref = isEn ? "/en/lodges" : "/bg/lodges";

  /**
   * Animation Variant
   * We use 'as const' on the transition to fix the TS2322 error 
   * regarding the ease: number[] type mismatch.
   */
  const slideFromBottom = {
    initial: { y: "100%", opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] as const 
    }
  };


  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* TOP DIV: Heading with bottom-up slide */}
      <div className="w-full p-8 lg:p-16 lg:pb-0 overflow-hidden">
        <motion.h2
          {...slideFromBottom}
          className="text-4xl lg:text-5xl xl:text-7xl leading-[0.85] tracking-tighter uppercase"
        >
          {heading}
        </motion.h2>
      </div>

      {/* BOTTOM DIV: Map Container */}
      <div className="w-full  lg:px-8 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
        <div className="flex flex-col md:flex-row gap-6"> 
            {lodges && lodges.length > 0 && lodges.map((lodge) => <LodgeCard key={lodge.id} lodge={lodge} locale={locale} />)}
        </div>
      </div>

        <motion.div
            {...slideFromBottom}
            className="self-center p-4 pb-8"
            >
            <a href={linkHref}>
                <Button text={buttonText} classes={"px-8 py-3 lg:px-12 lg:py-4 font-bold lg:text-xl "}/>
            </a>
        </motion.div>

    </div>
  );
};