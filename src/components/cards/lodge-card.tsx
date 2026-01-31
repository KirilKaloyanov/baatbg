"use client";

import { motion } from "framer-motion";
import CustomLink from "@/components/navigation/customLink";
// import { IMarker } from "@interfaces/Marker";
import { LodgeSimpleDTO } from "@/interfaces/LodgeSimpleDTO";

export default function LodgeCard({
  marker,
  locale,
}: {
  marker: LodgeSimpleDTO;
  locale: string;
}) {
  return (
    <motion.div
      className="h-full w-full transition"
      initial={{ y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <CustomLink
        href={`/${locale}/lodges/${marker.id}`}
        className="no-marker"
      >
        <div className="h-8">{/*empty space for top border effect*/}</div>
        <div className="bg-gray-50 text-center h-48 w-full">
            {marker.imgHero && (
              <img
                className="h-full w-full object-cover"
                src={marker.imgHero}
                alt={marker.id + " logo"}
              />
            )}
        </div>
        <div className="px-6 py-5 text-center">
          <h3 className="text-2xl leading-tight font-extrabold text-base-900">
            {marker.name[locale]}
          </h3>
          <p className="mb-1 text-xs font-bold tracking-widest text-stone-500 uppercase">
            {marker.community[locale]}
          </p>
        </div>
      </CustomLink>
    </motion.div>
  );
}
