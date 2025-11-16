"use client";

import { useMemo } from 'react';

import { Marker } from 'react-leaflet';
import L from 'leaflet'; 

import { IMarker } from '@/interfaces/Marker';

import myIcon from "../pin.png";

function MarkerLayer ({ 
    markers, 
    selectedMarker, 
    onMarkerClick, 
}: {
    markers: IMarker[];
    selectedMarker: IMarker;
    onMarkerClick: (marker: IMarker) => void;
}) {

    const icon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [50, 50] }), []);
    const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [80, 80] }), []);
 
    return (
        <>
            {markers.map((marker) => {
                const eventHandlers = {
                    click: () => onMarkerClick(marker),
                };
                
                const iconToUse = selectedMarker.key === marker.key ? selectedIcon : icon;
                
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