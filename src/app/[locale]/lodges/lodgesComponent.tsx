"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import ImageSlider from "@/components/slider/slider";

import { IMarker } from "@interfaces/Marker";

const DynamicOverviewMap = dynamic(
  () => import("@components/map/overviewMap"),
  { ssr: false },
);

export default function LodgesComponent({
  locale,
  markers,
  initialSelectedMarker,
}: {
  locale: string;
  markers: IMarker[];
  initialSelectedMarker: IMarker;
}) {

  const [selectedMarker, setSelectedMarker] = useState<IMarker>(initialSelectedMarker);

  const mapParentRef = useRef<any | null>(null);

  useEffect(() => {
    if (mapParentRef.current && selectedMarker.position) {
      mapParentRef.current.flyTo(selectedMarker.position, 8, { animate: true });
    }
  }, [selectedMarker]);

  const handlerMarkerClick = (marker: IMarker) => {
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
          <DynamicOverviewMap
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
