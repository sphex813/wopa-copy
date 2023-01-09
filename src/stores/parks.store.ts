import { useParksApi } from "@/composables/api/parkApi.composable";
import { useParkAddress } from "@/composables/parkAddress.composable";
import type { IPark } from "@/models/park.interface";
import { defineStore, getActivePinia } from "pinia";
import { ref, type Ref } from "vue";
export const useParksStore = defineStore("parks", () => {
  const axios = getActivePinia()?.axios!;
  const {
    getParks: getParksApi,
    insertPark: insertParkApi,
    deletePark: deleteParkApi,
  } = useParksApi(axios);
  const parks: Ref<Set<IPark>> = ref(new Set<IPark>());
  const { getNewParkDetails } = useParkAddress();

  const getParks = async () => {
    const parksResponse = await getParksApi();
    parksResponse.forEach((park) => parks.value.add(park));
  };

  const insertPark = async (latlng: google.maps.LatLng, userId: number) => {
    const park = await getNewParkDetails(latlng, userId);
    const insertedPark = await insertParkApi(park);
    parks.value.add(insertedPark);
    return insertedPark;
  };

  const deletePark = async (parkId: number) => {
    try {
      await deleteParkApi(parkId);
      const parkToDelete = [...parks.value].find(
        (park) => park.park_id === parkId
      )!;
      parks.value.delete(parkToDelete);
    } catch (error) {
      console.log("park couldnt be deleted");
    }
  };

  return { parks, getParks, insertPark, deletePark };
});
