<style lang="scss" scoped></style>

<template>
  <div ref="mapDiv"></div>
</template>

<script lang="ts" setup>
import { useMap } from "@/composables/google-maps-composable";
import type { IPark } from "@/models/park.interface";
import { useGoogleMapStore } from "@/stores/googleMap.store";
import { onMounted, onUnmounted, ref } from "vue";
const emit = defineEmits<{
  (e: "map-click"): void;
  (e: "user-marker-click", latLng: google.maps.LatLng): void;
  (e: "park-marker-click", park: IPark): void;
}>();
const mapDiv = ref<HTMLElement | null>(null);
useMap(mapDiv);
const googleMapStore = useGoogleMapStore();
let mapClickListener: google.maps.MapsEventListener | undefined;

onMounted(() => {
  googleMapStore.$onAction(({ name, store, after }) => {
    if (name === "initializeGoogleMap") {
      after(() => {
        mapClickListener = store
          .getGoogleMap()
          .addListener("click", (e: google.maps.MapMouseEvent) => {
            store.createUserMarker(e);
            emit("map-click");
          });

        store.setWorkoutParkMarkers((park) => {
          emit("park-marker-click", park);
        });
      });
    }

    if (name === "createUserMarker") {
      after(() => {
        store
          .getUserMarker()
          .addListener("click", (e: google.maps.MapMouseEvent) => {
            emit("user-marker-click", e.latLng!);
          });
      });
    }
  });
});

onUnmounted(() => mapClickListener?.remove());
</script>

<style lang="scss" scoped></style>
