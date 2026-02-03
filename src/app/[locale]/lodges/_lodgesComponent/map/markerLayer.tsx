"use client";

import { useMemo } from 'react';

import { Marker } from 'react-leaflet';
import L from 'leaflet'; 

import myIcon from "@components/mapControls/pin.png";
import { LodgeBaseDTO } from '@/interfaces/LodgeDTO';

function MarkerLayer ({ 
    lodges, 
    selectedLodge, 
    onLodgeClick, 
}: {
    lodges: LodgeBaseDTO[];
    selectedLodge: LodgeBaseDTO;
    onLodgeClick: (lodge: LodgeBaseDTO) => void;
}) {

    const icon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [50, 50] }), []);
    const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [80, 80] }), []);
 
    return (
        <>
            {lodges.map((lodge) => {
                const eventHandlers = {
                    click: () => onLodgeClick(lodge),
                };
                
                const iconToUse = selectedLodge.id === lodge.id ? selectedIcon : icon;
                
                return (
                    <Marker
                        key={lodge.id}
                        position={[lodge.location.lat, lodge.location.lng]}
                        icon={iconToUse}
                        eventHandlers={eventHandlers}
                    />
                );
            })}
        </>
    );
};

export default MarkerLayer;