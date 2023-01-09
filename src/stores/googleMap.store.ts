import type { IPark } from "@/models/park.interface";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { defineStore } from "pinia";
import { useParksStore } from "./parks.store";
export const useGoogleMapStore = defineStore("googleMapStore", () => {
  let map: google.maps.Map | null = null;
  let geocoder: google.maps.Geocoder;
  let userMarker: google.maps.Marker | null = null;
  let markerClusterer: MarkerClusterer;

  const getGoogleMap = (): google.maps.Map => {
    if (map) {
      return map;
    }
    throw new Error("Google maps was not initialized");
  };

  const getGeocoder = (): google.maps.Geocoder => {
    if (geocoder) {
      return geocoder;
    }
    throw new Error("Google geocoder was not initialized");
  };

  const getUserMarker = (): google.maps.Marker => {
    if (userMarker) {
      return userMarker;
    }
    throw new Error("User marker was not initialized");
  };

  const initializeGoogleMap = (googleMap: google.maps.Map) => {
    map = googleMap;
    createClusterer();
    setCurrentLocation();
  };

  const initializeGeocoder = (gc: google.maps.Geocoder) => {
    geocoder = gc;
  };

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        getGoogleMap().panTo(pos);
      },
      null,
      { enableHighAccuracy: true }
    );
  };

  const createUserMarker = (e: google.maps.MapMouseEvent) => {
    if (userMarker) {
      userMarker.setMap(null); //creating ML even though it should free memory
      userMarker.setAnimation(google.maps.Animation.DROP);
      userMarker.setPosition(e.latLng);
      userMarker.setMap(getGoogleMap());
    } else {
      userMarker = new google.maps.Marker({
        position: e.latLng,
        map: getGoogleMap(),
        icon: "src/assets/plus_marker.png",
        animation: google.maps.Animation.DROP,
      });

      userMarker.addListener("click", (e: google.maps.MapMouseEvent) => {
        getGoogleMap().panTo(e.latLng!);
      });
    }
  };

  const getParkMarker = (
    lat: number,
    lng: number,
    googleMap: google.maps.Map
  ) => {
    return new google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
      animation: google.maps.Animation.DROP,
      icon: "src/assets/park_marker.png",
    });
  };

  const createClusterer = () => {
    markerClusterer = new MarkerClusterer({
      map: getGoogleMap(),
      markers: [],
      renderer: {
        render: ({ count, position }) =>
          new google.maps.Marker({
            position,
            label: {
              text: String(count),
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
            },
            icon: "src/assets/cluster_icon.png",
          }),
      },
    });
  };

  const setWorkoutParkMarkers = async (
    parkClickCallback: (park: IPark) => void
  ) => {
    //if not logged in show only allowed
    //if logged in and admin show all
    //if logged in and owner show all his and all approved
    useParksStore().parks.forEach((park) => {
      createParkMarker(park, parkClickCallback);
    });
  };

  const createParkMarker = (
    park: IPark,
    parkClickCallback: (park: IPark) => void
  ) => {
    const parkMarker = getParkMarker(
      park.latitude,
      park.longitude,
      getGoogleMap()
    );

    markerClusterer.addMarker(parkMarker);

    parkMarker.addListener("click", (e: google.maps.MapMouseEvent) => {
      getGoogleMap().panTo(e.latLng!);
      parkClickCallback(park);
    });
  };

  return {
    getGoogleMap,
    getUserMarker,
    getGeocoder,
    createUserMarker,
    createParkMarker,
    initializeGoogleMap,
    initializeGeocoder,
    setWorkoutParkMarkers,
  };
});
