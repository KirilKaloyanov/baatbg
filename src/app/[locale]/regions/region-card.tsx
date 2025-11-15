"use client";

import { motion } from "framer-motion";
import CustomLink from "@/components/navigation/customLink";
import { RegionDTO } from "@/interfaces/RegionDTO";

export default function RegionCard({
  region,
  locale,
}: {
  region: RegionDTO;
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
        href={`/${locale}/regions/${region.id}`}
        className="no-marker"
      >
        <div className="h-8">{/*empty space for top border effect*/}</div>
        <div className="bg-gray-50 text-center h-48 w-full">
          {region.imgThumb && (
            <img
              className="h-full w-full object-cover"
              src={region.imgThumb}
              alt={region.header[locale] + " image"}
            />
          )}
        </div>
        <div className="px-6 py-5 text-center">
          <h4 className="text-2xl leading-tight font-extrabold text-gray-800">
            {region.header[locale]}
          </h4>
        </div>
      </CustomLink>
    </motion.div>
  );
}
