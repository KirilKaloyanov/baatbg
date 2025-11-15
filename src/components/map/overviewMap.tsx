"use client";

import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ZoomInButton from "./controls/zoomInButton";
import ZoomOutButton from "./controls/zoomOutButton";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const icon = {
  iconUrl: "/icons/map/marker-icon.png",
  iconRetinaUrl: "/icons/map/marker-icon-2x.png",
  shadowUrl: "/icons/map/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};

L.Icon.Default.mergeOptions(icon);

interface OverviewMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: { position: [number, number]; popupText: string }[];
}

function OverviewMap ({
  center = [42.6977, 23.3219], // Default to Sofia, Bulgaria
  zoom = 7,
  markers = [
    { position: [42.6977, 23.3219], popupText: "Sofia" },
    { position: [43.2141, 27.9147], popupText: "Varna" },
    { position: [42.1354, 24.7453], popupText: "Plovdiv" },
  ],
}: OverviewMapProps) {
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
          className="!box-content"
          ref={mapInstanceRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>{marker.popupText}</Popup>
            </Marker>
          ))}
          <ZoomInButton />
          <ZoomOutButton />
        </MapContainer>
      </div>

      <h1 className="mt-10">Content...</h1>
    </>
  );
};

export default OverviewMap;
