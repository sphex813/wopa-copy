import { useGoogleMapStore } from "@/stores/googleMap.store";
export const useGeocoder = () => {
  const { getGeocoder } = useGoogleMapStore();
  const geocodeLatLng = (
    latlng: google.maps.LatLng
  ): Promise<google.maps.GeocoderResponse> => {
    return getGeocoder().geocode({ location: latlng });
  };

  return { geocodeLatLng };
};
