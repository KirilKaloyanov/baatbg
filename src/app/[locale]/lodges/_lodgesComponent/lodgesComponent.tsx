"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import ImageSlider from "@/app/[locale]/lodges/_lodgesComponent/imageSlider";

import { LodgeBaseDTO } from "@/interfaces/LodgeDTO";

const OverviewMap = dynamic(
  () => import("@/app/[locale]/lodges/_lodgesComponent/overviewMap"),
  { ssr: false },
);

export default function LodgesComponent({
  locale,
  lodges,
  initialSelectedLodge,
}: {
  locale: string;
  lodges: LodgeBaseDTO[];
  initialSelectedLodge: LodgeBaseDTO;
}) {

  const [selectedLodge, setSelectedLodge] = useState<LodgeBaseDTO>(initialSelectedLodge);
  const mapParentRef = useRef<any | null>(null);

  useEffect(() => {
    if (mapParentRef.current && selectedLodge.location) {
      mapParentRef.current.flyTo([selectedLodge.location.lat, selectedLodge.location.lng], 8, { animate: true });
    }
  }, [selectedLodge]);

  const handlerLodgeClick = (lodge: LodgeBaseDTO) => {
    setSelectedLodge(lodge);
  };

  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row">
        <div className="h-100 md:h-125 flex-1">
          <ImageSlider
            locale={locale}
            lodges={lodges}
            selectedLodge={selectedLodge}
            onLodgeClick={handlerLodgeClick}
          />
        </div>
        <div className="h-125 w-full flex-1">
          <OverviewMap
            mapParentRef={mapParentRef}
            lodges={lodges}
            selectedLodge={selectedLodge}
            onLodgeClick={handlerLodgeClick}
          />
        </div>
      </div>
    </>
  );
}
