// components/MapControls/ZoomButton.tsx

"use client";

import { useMap } from 'react-leaflet';
import React from 'react';

// This component must be rendered inside the MapContainer
function ZoomInButton() {
    // 🌟 Get the map instance
    const map = useMap();

    const handleZoomIn = () => {
        // Use the Leaflet method on the map instance
        map.zoomIn();
    };

    return (
        <button
            onClick={handleZoomIn}
            // Use z-index and absolute/fixed positioning to place the button visually
            // outside or on top of other elements, as needed.
            style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '100px', 
                zIndex: 1000,
                width: '80px',
                height: '80px',
                paddingBottom: '3px',
                backgroundColor: 'var(--accent-100)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '36px',
                borderRadius: '50%',
            }}
        >
            +
        </button>
    );
};

export default ZoomInButton;