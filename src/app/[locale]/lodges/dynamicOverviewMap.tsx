"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicOverviewMap = dynamic(
  () => import("@components/map/overviewMap"),
  { ssr: false },
);

export default function LodgesMap() {
  const [ selectedMarker, setSelectedMarker ] = useState<string | null>(null);

  const handlerMarkerClick = (markerId: string) => {
    console.log("Marker clicked:", markerId);
    setSelectedMarker(markerId);
  };

  return (
    <>
        <DynamicOverviewMap onMarkerClick={handlerMarkerClick} selectedMarker={selectedMarker} />
    </>
  );
}
