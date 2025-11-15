"use client";

import { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerLayer from "./controls/markerLayer";
import ZoomInButton from "./controls/zoomInButton";
import ZoomOutButton from "./controls/zoomOutButton";
import { IMarker } from "@interfaces/Marker";
import "leaflet/dist/leaflet.css";


interface OverviewMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: IMarker[];
  onMarkerClick: (marker: IMarker) => void;
  selectedMarker?: IMarker | null;
}

function OverviewMap({
  center = [42.6977, 25.219], // Default to Sofia, Bulgaria
  zoom = 7,
  markers = [
    { key: "sofia", position: [42.6977, 23.3219] },
    { key: "varna", position: [43.2141, 27.9147] },
    { key: "plovdiv", position: [42.1354, 24.7453] },
  ],
  onMarkerClick,
  selectedMarker = null,
}: OverviewMapProps) {
  const mapInstanceRef = useRef<any | null>(null);

  useEffect(() => {
    return () => {
      try {
        if (mapInstanceRef.current) mapInstanceRef.current.remove();
      } catch (error) {
        console.warn("Error removing map instance:", error);
      }
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 mt-10">
        <h1>Content...</h1>
        <h1>Content...</h1>
        <h1>Content...</h1>
        <h1>Content...</h1>
        <h1>Content...</h1>
        <h1>Content...</h1>
        <h1>Content...</h1>
        <h1>Content...</h1>
      </div>
      <div
        style={{ height: "600px", width: "100%" }}
        className="flex-1 mt-10"
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
            <MarkerLayer 
              markers={markers} 
              onMarkerClick={onMarkerClick}
              selectedMarker={selectedMarker}
            />
          <ZoomInButton />
          <ZoomOutButton />
        </MapContainer>
      </div>

    </div>
  );
}

export default OverviewMap;
