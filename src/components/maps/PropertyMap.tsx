'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { MapPin, Coffee, ShoppingBag, School, Building as Hospital, Leaf, Utensils, Train, Bus, Car } from 'lucide-react';
import type { Property } from '@/types/properties';

// Define the types of places we want to show
const placeTypes = [
  { type: 'restaurant', icon: Utensils, color: '#FF5722', label: 'Restaurantes' },
  { type: 'cafe', icon: Coffee, color: '#795548', label: 'Cafés' },
  { type: 'shopping_mall', icon: ShoppingBag, color: '#9C27B0', label: 'Centros Comerciales' },
  { type: 'school', icon: School, color: '#2196F3', label: 'Escuelas' },
  { type: 'hospital', icon: Hospital, color: '#F44336', label: 'Hospitales' },
  { type: 'park', icon: Leaf, color: '#4CAF50', label: 'Parques' },
  { type: 'train_station', icon: Train, color: '#607D8B', label: 'Estaciones de Tren' },
  { type: 'bus_station', icon: Bus, color: '#FF9800', label: 'Estaciones de Autobús' },
  { type: 'parking', icon: Car, color: '#3F51B5', label: 'Estacionamientos' },
];

// Map container style
const containerStyle = {
  width: '100%',
  height: '600px', // Increased height for better visibility
  borderRadius: '12px',
};

interface PropertyMapProps {
  property: Property;
}

interface Place {
  id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  placeType?: string;
  icon?: any;
  color?: string;
}

const PropertyMap = ({ property }: PropertyMapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const fetchingRef = useRef(false);
  
  // Get property coordinates - use a default if not available
  const propertyLat = property.location?.coordinates?.lat || 0;
  const propertyLng = property.location?.coordinates?.lng || 0;
  
  // If no coordinates are provided, use a default location (Mexico City)
  const center = {
    lat: propertyLat || 19.4326,
    lng: propertyLng || -99.1332,
  };
  
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });
  
  // Reference to the Places service
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  
  // Initialize the map
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Initialize Places service
    if (window.google && window.google.maps) {
      placesServiceRef.current = new window.google.maps.places.PlacesService(map);
      setMapInitialized(true);
    }
  }, []);
  
  // Clean up on unmount
  const onUnmount = useCallback(() => {
    setMap(null);
    setMapInitialized(false);
    setNearbyPlaces([]);
    setSelectedPlaceTypes([]);
    fetchingRef.current = false;
  }, []);
  
  // Fetch places function - separated to avoid recreation on each render
  const fetchPlaces = useCallback(async () => {
    if (!placesServiceRef.current || !selectedPlaceTypes.length || fetchingRef.current) {
      return;
    }
    
    fetchingRef.current = true;
    setIsLoading(true);
    
    try {
      const allPlaces: Place[] = [];
      
      // Search for each selected place type
      for (const placeType of selectedPlaceTypes) {
        const request = {
          location: center,
          radius: 1000, // 1km radius
          type: placeType,
        };
        
        try {
          const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject(new Error('Places API request timed out'));
            }, 10000); // 10 second timeout
            
            placesServiceRef.current?.nearbySearch(
              request,
              (results, status) => {
                clearTimeout(timeoutId);
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                  resolve(results);
                } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                  resolve([]);
                } else {
                  reject(new Error(`Places API error: ${status}`));
                }
              }
            );
          });
          
          // Add the place type to each result and convert to our Place type
          const placesWithType = results.map(place => ({
            id: place.place_id || `place-${Math.random()}`,
            name: place.name || 'Unknown Place',
            vicinity: place.vicinity || '',
            geometry: {
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
              }
            },
            types: place.types || [],
            placeType,
            icon: placeTypes.find(p => p.type === placeType)?.icon,
            color: placeTypes.find(p => p.type === placeType)?.color,
          }));
          
          allPlaces.push(...placesWithType);
        } catch (error) {
          console.error(`Error fetching ${placeType} places:`, error);
        }
      }
      
      setNearbyPlaces(allPlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, [center, selectedPlaceTypes]);
  
  // Search for nearby places when place types are selected
  useEffect(() => {
    if (mapInitialized && selectedPlaceTypes.length > 0 && !fetchingRef.current) {
      // Add a small delay to ensure the map is fully loaded and to debounce multiple selections
      const timer = setTimeout(() => {
        fetchPlaces();
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // If no place types are selected, clear the places
    if (selectedPlaceTypes.length === 0) {
      setNearbyPlaces([]);
      setIsLoading(false);
    }
  }, [mapInitialized, selectedPlaceTypes, fetchPlaces]);
  
  // Toggle place type selection
  const togglePlaceType = useCallback((type: string) => {
    setSelectedPlaceTypes(prev => {
      // If already selected, remove it
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      // Otherwise add it
      return [...prev, type];
    });
  }, []);
  
  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] bg-background/50 rounded-xl flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-foreground/70">Cargando mapa...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 w-full">
      <div className="bg-background border border-border/40 rounded-xl overflow-hidden soft-shadow w-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            gestureHandling: 'cooperative', // Improves mobile interaction
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          }}
        >
          {/* Property Marker */}
          {mapInitialized && (
            <Marker
              position={center}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 40),
              }}
              animation={google.maps.Animation.DROP}
              title={property.title}
            />
          )}
          
          {/* Property radius circle */}
          {mapInitialized && (
            <Circle
              center={center}
              radius={1000}
              options={{
                fillColor: '#7C3AED',
                fillOpacity: 0.05,
                strokeColor: '#7C3AED',
                strokeOpacity: 0.2,
                strokeWeight: 2,
              }}
            />
          )}
          
          {/* Nearby places markers */}
          {mapInitialized && nearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${place.color}" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12),
              }}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
          
          {/* Info window for selected place */}
          {mapInitialized && selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry.location.lat,
                lng: selectedPlace.geometry.location.lng,
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-2 max-w-[200px]">
                <h3 className="font-medium text-sm">{selectedPlace.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{selectedPlace.vicinity}</p>
                <div className="flex items-center mt-2">
                  <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: selectedPlace.color }}></span>
                  <span className="text-xs">{placeTypes.find(p => p.type === selectedPlace.placeType)?.label}</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      
      {/* Place type filters */}
      <div className="bg-background border border-border/40 rounded-xl p-4 soft-shadow w-full overflow-x-auto">
        <h3 className="text-sm font-medium mb-3">Mostrar lugares cercanos:</h3>
        <div className="flex flex-wrap gap-2">
          {placeTypes.map(({ type, icon: Icon, color, label }) => (
            <button
              key={type}
              onClick={() => togglePlaceType(type)}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedPlaceTypes.includes(type)
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'bg-background border border-border/50 text-foreground/70 hover:border-accent/30'
              }`}
              disabled={isLoading}
            >
              <Icon size={14} className="mr-1" style={{ color: selectedPlaceTypes.includes(type) ? color : undefined }} />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mr-2"></div>
          <p className="text-sm text-foreground/70">Buscando lugares cercanos...</p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap; 