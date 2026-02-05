
"use client";

import { MouseEvent } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function ZoomButton( { type }: { type: 'in' | 'out' } ) {
    const map = useMap();

    const handleZoom = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        L.DomEvent.stopPropagation(e.nativeEvent);
        if (type === 'out') map.zoomOut();
        if (type === 'in') map.zoomIn();
    };

    return (
        <div
            onClick={handleZoom}
            style={{ 
                position: 'absolute', 
                top: '10px', 
                right:  type === 'in' ? '80px' : '10px', 
                zIndex: 1000,
                width: '60px',
                height: '60px',
                padding: '12px',
                backgroundColor: 'var(--base-900)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '36px',
                borderRadius: '50%',
            }}
        >
            <div
                style={{
                    width: '15px',
                    height: '2px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '29px',
                    left: '23px',
                }}></div>
            { type === 'in' && <div
                style={{
                    width: '2px',
                    height: '15px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '23px',
                    left: '29px',
                }}></div>}
        </div>
    );
};

export default ZoomButton;