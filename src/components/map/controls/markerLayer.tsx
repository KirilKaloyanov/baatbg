// components/map/MarkerLayer.tsx

"use client";

import { useMemo } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { IMarker } from '@/interfaces/Marker';
import myIcon from "../pin.png";
import L from 'leaflet'; // Need L for custom icons



interface MarkerLayerProps {
    markers: IMarker[];
    onMarkerClick: (marker: IMarker) => void;
    selectedMarker: IMarker | null;
}


function MarkerLayer ({ 
    markers, 
    onMarkerClick, 
    selectedMarker, 
}: MarkerLayerProps) {
    const icon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [50, 50] }), []);
    const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [80, 80] }), []);
    const map = useMap(); 

    const handleMarkerClick = (marker: IMarker) => {
        // 1. Trigger the parent callback function
        if (onMarkerClick) {
            onMarkerClick(marker);
        }

        // 2. 🚀 Panning/Flying the map
        const newZoom = 7; // Optional: Zoom in when clicking
        const flyOptions = { duration: 1.5, easeLinearity: 0.25 };
        
        map.flyTo(marker.position, newZoom, flyOptions);
    };

    return (
        <>
            {markers.map((marker) => {
                const eventHandlers = {
                    click: () => handleMarkerClick(marker),
                };
                
                const iconToUse = selectedMarker?.key === marker.key ? selectedIcon : icon;
                
                return (
                    <Marker
                        key={marker.key}
                        position={marker.position}
                        icon={iconToUse}
                        eventHandlers={eventHandlers}
                    />
                );
            })}
        </>
    );
};

export default MarkerLayer;