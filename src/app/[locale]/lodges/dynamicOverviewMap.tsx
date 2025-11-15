"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IMarker } from "@interfaces/Marker";

const DynamicOverviewMap = dynamic(
  () => import("@components/map/overviewMap"),
  { ssr: false },
);

export default function LodgesMap() {
  const [ selectedMarker, setSelectedMarker ] = useState<IMarker | null>(null);

  const handlerMarkerClick = (marker: IMarker) => {
    console.log("Marker clicked:", );
    setSelectedMarker(marker);
  };

  return (
    <>
        <DynamicOverviewMap center={selectedMarker?.position} onMarkerClick={handlerMarkerClick} selectedMarker={selectedMarker} />
    </>
  );
}
