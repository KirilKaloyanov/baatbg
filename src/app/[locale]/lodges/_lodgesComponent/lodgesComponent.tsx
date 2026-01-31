"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import ImageSlider from "@/app/[locale]/lodges/_lodgesComponent/imageSlider";

// import { IMarker } from "@interfaces/Marker";
import { LodgeSimpleDTO } from "@/interfaces/LodgeSimpleDTO";

const OverviewMap = dynamic(
  () => import("@/app/[locale]/lodges/_lodgesComponent/overviewMap"),
  { ssr: false },
);

export default function LodgesComponent({
  locale,
  markers,
  initialSelectedMarker,
}: {
  locale: string;
  markers: LodgeSimpleDTO[];
  initialSelectedMarker: LodgeSimpleDTO;
}) {

  const [selectedMarker, setSelectedMarker] = useState<LodgeSimpleDTO>(initialSelectedMarker);
  const mapParentRef = useRef<any | null>(null);

  useEffect(() => {
    if (mapParentRef.current && selectedMarker.location) {
      mapParentRef.current.flyTo([selectedMarker.location.lat, selectedMarker.location.lng], 8, { animate: true });
    }
  }, [selectedMarker]);

  const handlerMarkerClick = (marker: LodgeSimpleDTO) => {
    setSelectedMarker(marker);
  };

  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row">
        <div className="h-[400px] md:h-[500px] flex-1">
          <ImageSlider
            locale={locale}
            markers={markers}
            selectedMarker={selectedMarker}
            onMarkerClick={handlerMarkerClick}
          />
        </div>
        <div className="h-[500px] w-full flex-1">
          <OverviewMap
            mapParentRef={mapParentRef}
            markers={markers}
            selectedMarker={selectedMarker}
            onMarkerClick={handlerMarkerClick}
          />
        </div>
      </div>
    </>
  );
}
