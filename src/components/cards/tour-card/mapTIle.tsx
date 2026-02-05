import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMemo } from 'react';
import L from 'leaflet';

import { TourUI } from '@/interfaces/TourDTO';

import ZoomButton from "@/components/controls/zoomButton";
import myIcon from "@components/controls/pin.png";

import "leaflet/dist/leaflet.css";


export default function MapTile ({ tour }: { tour: TourUI }) {
    const selectedIcon = useMemo(() => L.icon({ iconUrl: myIcon.src, iconSize: [40, 40] }), []);

    return  (
        <div>
            <MapContainer
                center={tour.center ? [tour.center.lat, tour.center.lng] : [24,42]} 
                zoom={tour.zoom}
                scrollWheelZoom={false}
                zoomControl={false}
                doubleClickZoom={false}
                dragging={false}
                style={{ height: "360px", width: "100%", zIndex: 0 }}
                >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {

                        tour.itinerary.map((step, index) => (<Marker icon={selectedIcon} position={[step.lat, step.lng]} key={index} />))
                    }
                    

            </MapContainer>
                    
        </div>
        );
}