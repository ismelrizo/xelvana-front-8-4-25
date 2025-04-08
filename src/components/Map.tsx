import React from 'react';
import { useEffect, useState } from 'react';

interface MapProps {
  coordinates: [number, number];
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadComponents = async () => {
        try {
          const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
          const L = await import('leaflet');
          await import('leaflet/dist/leaflet.css');

          // Fix for default marker icon
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          });

          setMapComponents({ MapContainer, TileLayer, Marker, Popup });
          setIsClient(true);
        } catch (error) {
          console.error('Error loading map components:', error);
        }
      };

      loadComponents();
    }
  }, []);

  if (!isClient || !MapComponents) {
    return <div className="h-full w-full bg-gray-100 animate-pulse"></div>;
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <MapContainer
      center={coordinates}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>
          Xelvana Residential
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;