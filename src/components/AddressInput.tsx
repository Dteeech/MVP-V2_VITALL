import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Map } from './Map';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

interface GeocodingResult {
  display_name: string;
  lat: string;
  lon: string;
}

export function AddressInput({ value, onChange, error }: AddressInputProps) {
  const [location, setLocation] = useState<[number, number]>([48.8566, 2.3522]); // Default to Paris
  const [isLoading, setIsLoading] = useState(false);

  // Mock fire stations data
  const fireStations = [
    { position: [48.8566, 2.3522] as [number, number], name: "Caserne Paris Centre" },
    { position: [48.8656, 2.3482] as [number, number], name: "Caserne Château d'Eau" },
    { position: [48.8605, 2.3376] as [number, number], name: "Caserne Rousseau" }
  ];

  const handleGeolocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data: GeocodingResult = await response.json();
          onChange(data.display_name);
        } catch (error) {
          console.error('Error fetching address:', error);
          alert("Erreur lors de la récupération de l'adresse");
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert("Erreur lors de la géolocalisation");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879] ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Votre adresse"
        />
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#347879] text-white rounded-md hover:bg-[#ED6D47] transition-colors flex items-center gap-1 text-sm"
        >
          <MapPin className="w-4 h-4" />
          {isLoading ? 'Chargement...' : 'Me localiser'}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Map center={location} markers={fireStations} />
    </div>
  );
}