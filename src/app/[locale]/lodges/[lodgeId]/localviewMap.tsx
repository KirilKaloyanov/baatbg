"use client";

import { useMemo } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import ZoomButton from "@/components/controls/zoomButton";
import myIcon from "@components/controls/pin.png";

import "leaflet/dist/leaflet.css";

export default function LocalviewMap({ center }: { center: [number, number] }) {

    const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [80, 80] }), []);

    return (
        <MapContainer
            center={center} 
            zoom={12}
            scrollWheelZoom={false}
            zoomControl={false}
            doubleClickZoom={false}
            style={{ height: "500px", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
                <Marker icon={selectedIcon} position={center} />
            <ZoomButton type="in" />
            <ZoomButton type="out" />
        </MapContainer>
    );
}