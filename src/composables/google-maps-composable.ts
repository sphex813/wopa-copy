import { useGoogleMapStore } from "@/stores/googleMap.store";
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, type Ref } from "vue";

const loader = new Loader({
  apiKey: "AIzaSyBpTMPmRyjD3uPcoH5XkWM7jHOS4Wc0Gzg",
  version: "weekly",
});

const mapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const mapOptions: google.maps.MapOptions = {
  center: {
    lat: 50.0704099,
    lng: 14.4614448,
  },
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: mapStyles,
  zoom: 15,
};

export const useMap = (mapRef: Ref<HTMLElement | null>) => {
  const { initializeGoogleMap, initializeGeocoder } = useGoogleMapStore();

  const initMap = async (mapDiv: HTMLElement) => {
    return await loader.load().then((google) => {
      const geocoder = new google.maps.Geocoder();
      initializeGeocoder(geocoder);
      const googleMap = new google.maps.Map(mapDiv, mapOptions);
      initializeGoogleMap(googleMap);
    });
  };

  onMounted(async () => {
    await initMap(mapRef.value!);
  });
};
