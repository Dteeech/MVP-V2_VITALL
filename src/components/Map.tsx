import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center: [number, number];
  markers: Array<{
    position: [number, number];
    name: string;
  }>;
}

// Component to handle map center updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(new LatLng(center[0], center[1]), 13);
  }, [center, map]);
  
  return null;
}

export function Map({ center, markers }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-[300px] w-full rounded-lg shadow-md z-0"
    >
      <MapUpdater center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div className="font-medium">{marker.name}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}