"use client";

import { useRef, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ZoomInButton from "./controls/zoomInButton";
import ZoomOutButton from "./controls/zoomOutButton";
import L from "leaflet";
import myIcon from "./pin.png";
// import justIconFile from "./pin.png";
import "leaflet/dist/leaflet.css";

// const icon = {
//   iconUrl: "/icons/map/pin.png",
//   iconRetinaUrl: "/icons/map/pin.png",
//   shadowUrl: "/icons/map/marker-shadow.png",
//   iconSize: [50, 50],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// };

// L.Icon.Default.mergeOptions(icon);

interface OverviewMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: { key: string; position: [number, number] }[];
  onMarkerClick?: (markerId: string) => void;
  selectedMarker?: string | null;
}

function OverviewMap({
  center = [42.6977, 24.8219], // Default to Sofia, Bulgaria
  zoom = 7,
  markers = [
    { key: "sofia", position: [42.6977, 23.3219] },
    { key: "varna", position: [43.2141, 27.9147] },
    { key: "plovdiv", position: [42.1354, 24.7453] },
  ],
  onMarkerClick,
  selectedMarker = null,
}: OverviewMapProps) {
  const icon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [50, 50] }), []);
  const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [80, 80] }), []);
  const mapInstanceRef = useRef<any | null>(null);

  useEffect(() => {
    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }
      } catch (error) {
        console.warn("Error removing map instance:", error);
      }
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        style={{ height: "800px", width: "100%" }}
        className="relative mt-10"
      >
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          zoomControl={false}
          style={{ height: "500px", width: "100%", zIndex: 0 }}
          ref={mapInstanceRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker, index) => {
            const eventHandlers = {
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(marker.key);
                }
              },
            };
            const selected = selectedMarker === marker.key ? selectedIcon : icon;
            return (
              <Marker
                key={marker.key}
                position={marker.position}
                icon={selected}
                eventHandlers={eventHandlers}
              />
            )
          })}
          <ZoomInButton />
          <ZoomOutButton />
        </MapContainer>
      </div>

      <h1 className="mt-10">Content...</h1>
    </>
  );
}

export default OverviewMap;
