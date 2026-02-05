"use client";



import { TourUI } from "@/interfaces/TourDTO";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const MapTile = dynamic(
  () => import("@components/cards/tour-card/mapTIle"),
  { ssr: false }
);

export default function TourCard({
  tour,
  locale,
}: {
  tour: TourUI;
  locale: string;
}) {

  return (
    <motion.div
      className="h-full w-full transition"
      initial={{ y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >

        <div className="lg:px-6 lg:py-5 text-center">
            <h3 className="text-2xl leading-tight font-extrabold text-base-900">
                {tour.title[locale]}
            </h3>
            
            <p className="mb-1 text-xs font-bold tracking-widest text-stone-500 uppercase">
                {tour.regionsNames.map((regionName) => regionName[locale]).join(", ")}
            </p>

            <div className="h-90 my-8">
                <MapTile tour={tour} />
            </div>

            <div className="flex justify-around px-6 text-stone-500">
              <p className="mb-1">
                  {tour.memberName[locale]}
              </p>
              <p className="mb-1" >
                  {tour.duration} {tour.duration > 1 ? (locale === "bg" ? "дни" : "days") : (locale === "bg" ? "ден" : "day")}
              </p>
            </div>

            <p className="mb-1 text-sm text-stone-500">
                {tour.activitiesNames.map((activityName) => activityName[locale]).join(", ")}
            </p>

              <p className="text-right font-bold">
            <a href={tour.link} target="_blank" rel="noopener noreferrer">
                {locale === "bg" ? "Подробности ..." : "More info ..."}
            </a>
              </p>
        </div>
    </motion.div>
  );
}
