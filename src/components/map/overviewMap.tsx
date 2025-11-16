"use client";

import { useRef, useEffect, MutableRefObject } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import MarkerLayer from "./controls/markerLayer";
import ZoomButton from "./controls/zoomButton";

import { IMarker } from "@interfaces/Marker";

import "leaflet/dist/leaflet.css";


function OverviewMap({
  mapParentRef,
  markers = [],
  selectedMarker,
  onMarkerClick,
}: {
  mapParentRef: MutableRefObject<any | null>,
  markers: IMarker[];
  selectedMarker: IMarker;
  onMarkerClick: (marker: IMarker) => void;
}) {

  const mapInstanceRef = useRef<any | null>(null);

  useEffect(() => {
    return () => {
      if (mapParentRef) mapParentRef.current = null;

      try {
        if (mapInstanceRef.current) mapInstanceRef.current.remove();
      } catch (error) {
        console.warn("Error removing map instance:", error);
      }
      mapInstanceRef.current = null;
    };
  }, [mapParentRef]);

  return (
    
        <MapContainer
          center={selectedMarker.position}
          zoom={8}
          scrollWheelZoom={false}
          zoomControl={false}
          doubleClickZoom={false}
          style={{ height: "500px", width: "100%", zIndex: 0 }}
          ref={mapInstanceRef}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
            <MarkerLayer 
              markers={markers} 
              selectedMarker={selectedMarker}
              onMarkerClick={onMarkerClick}
            />

          <ZoomButton type="in" />
          <ZoomButton type="out" />

          <MapBridge mapBridgeRef={mapParentRef} />
        </MapContainer>

  );
}

export default OverviewMap;



function MapBridge({ mapBridgeRef }: { mapBridgeRef?: MutableRefObject<any | null> }) {
  const map = useMap();

  useEffect(() => {
    if (!mapBridgeRef) return;
    mapBridgeRef.current = map;

    return () => {
      if (mapBridgeRef) mapBridgeRef.current = null;
    }
  }, [map, mapBridgeRef])

  return null;
}

//https://{s}.tile.opentopomap.org/{z}/{x}/{y}.
// Cartography: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>). Data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.

//https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
//&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>

// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'