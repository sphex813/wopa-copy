import type { IParkCreateRequest } from "@/models/park.interface";
import type { IAddress } from "@/models/park.interface copy";
import { useGeocoder } from "./geocoder.composable";
export const useParkAddress = () => {
  const { geocodeLatLng } = useGeocoder();

  const getGeocoderResult = async (
    latlng: google.maps.LatLng
  ): Promise<google.maps.GeocoderResult | undefined> => {
    const { results: addresses } = await geocodeLatLng(latlng);
    const geocoderResult = addresses.find(
      (result) =>
        result.types.includes("street_address") ||
        result.types.includes("route")
    );

    return geocoderResult;
  };

  const getAddress = (
    geocoderResult: google.maps.GeocoderResult | undefined
  ): IAddress => {
    const address: IAddress = {
      premise: "",
      street_number: "",
      route: "",
      neighborhood: "",
      locality: "",
      sublocality: "",
      country: "",
      postal_code: "",
    };

    (Object.keys(address) as (keyof typeof address)[]).forEach((key) => {
      address[key] = geocoderResult?.address_components.find((component) =>
        component.types.includes(key)
      )?.long_name;
    });

    return address;
  };

  const getNewParkDetails = async (
    latlng: google.maps.LatLng,
    user_id: number
  ) => {
    const result = await getGeocoderResult(latlng);
    const address = getAddress(result);
    const newPark: IParkCreateRequest = {
      latitude: latlng.lat(),
      longitude: latlng.lng(),
      ...address,
      user_id,
    };
    return newPark;
  };

  return { getNewParkDetails };
};
