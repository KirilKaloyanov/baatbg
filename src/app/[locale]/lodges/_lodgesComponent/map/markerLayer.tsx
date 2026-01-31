"use client";

import { useMemo } from 'react';

import { Marker } from 'react-leaflet';
import L from 'leaflet'; 

// import { IMarker } from '@/interfaces/Marker';

import myIcon from "@components/mapControls/pin.png";
import { LodgeSimpleDTO } from '@/interfaces/LodgeSimpleDTO';

function MarkerLayer ({ 
    markers, 
    selectedMarker, 
    onMarkerClick, 
}: {
    markers: LodgeSimpleDTO[];
    selectedMarker: LodgeSimpleDTO;
    onMarkerClick: (marker: LodgeSimpleDTO) => void;
}) {

    const icon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [50, 50] }), []);
    const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [80, 80] }), []);
 
    return (
        <>
            {markers.map((marker) => {
                const eventHandlers = {
                    click: () => onMarkerClick(marker),
                };
                
                const iconToUse = selectedMarker.id === marker.id ? selectedIcon : icon;
                
                return (
                    <Marker
                        key={marker.id}
                        position={[marker.location.lat, marker.location.lng]}
                        icon={iconToUse}
                        eventHandlers={eventHandlers}
                    />
                );
            })}
        </>
    );
};

export default MarkerLayer;