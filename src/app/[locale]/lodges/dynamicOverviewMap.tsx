"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicOverviewMap = dynamic(
  () => import("@components/map/overviewMap"),
  { ssr: false },
);

export default function LodgesMap() {
  return (
    <>
      <div id="leaflet-container">
        <DynamicOverviewMap />
      </div>
    </>
  );
}
