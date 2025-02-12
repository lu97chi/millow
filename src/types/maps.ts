// Google Maps types
export interface MapLocation {
  lat: number;
  lng: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapViewport {
  center: MapLocation;
  zoom: number;
}

export interface MapMarker {
  id: string;
  position: MapLocation;
  title?: string;
  content?: string;
}

// Store types
export interface MapStore {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map) => void;
  focusedPropertyId: string | null;
  setFocusedProperty: (id: string | null) => void;
  center: MapLocation;
  zoom: number;
  setView: (center: MapLocation, zoom: number) => void;
}

// Component props
export interface MapProps {
  center?: MapLocation;
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (markerId: string) => void;
  onBoundsChange?: (bounds: MapBounds) => void;
  onViewportChange?: (viewport: MapViewport) => void;
  showControls?: boolean;
} 

// Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: typeof google.maps.Map;
        Marker: typeof google.maps.Marker;
        InfoWindow: typeof google.maps.InfoWindow;
        LatLngBounds: typeof google.maps.LatLngBounds;
        MapOptions: google.maps.MapOptions;
      };
    };
  }
}