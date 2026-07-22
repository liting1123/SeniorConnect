import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type AppointmentDirectionsProps = {
  location: string;
  appointmentTitle: string;
};

export default function AppointmentDirections({ location, appointmentTitle }: AppointmentDirectionsProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!location) {
    return null;
  }

  const handleGetDirections = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get user's current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported on this device.'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const origin = `${latitude},${longitude}`;
      const destination = encodeURIComponent(location);
      
      // Open Google Maps with directions
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      window.open(mapsUrl, '_blank');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to get your location. Please enable location services.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex items-start gap-2 text-sm font-semibold text-[#5f6368]">
        <MapPin className="mt-0.5 h-4 w-4" />
        <span>{location}</span>
      </div>
      
      <button
        type="button"
        onClick={handleGetDirections}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#416642] px-3 py-2 text-sm font-bold text-white transition-all hover:bg-[#35523a] disabled:opacity-60 active:scale-95"
      >
        <Navigation className="h-4 w-4" />
        {isLoading ? 'Getting location...' : 'Get Directions'}
      </button>

      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-[#fee] p-2 text-xs text-[#c33]">
          <AlertCircle className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
