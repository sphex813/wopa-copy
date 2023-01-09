<template>
  <MenuButton />
  <MapComponent
    @user-marker-click="onUserMarkerClick"
    @park-marker-click="onParkMarkerClick"
    @map-click="isAddingOpen = false"
    class="map"
  />
  <component
    :is="sideBar.component"
    v-bind="sideBar.props"
    v-on="sideBar.events"
    :key="parkDetail?.park_id"
  />
</template>

<script setup lang="ts">
import MapComponent from "@/components/MapComponent.vue";
import MenuButton from "@/components/MenuButton.vue";
import type { IPark } from "@/models/park.interface";
import { computed, defineAsyncComponent, ref, type Ref } from "vue";
let markerLatLng: Ref<google.maps.LatLng | null> = ref(null);
let isAddingOpen: Ref<boolean> = ref(false);
let parkDetail: Ref<IPark | null> = ref(null);
let visibleComponent: Ref<"ADD" | "DETAIL"> = ref("ADD");
const AddPark = defineAsyncComponent(() => import("@/components/AddPark.vue"));
const ParkDetail = defineAsyncComponent(
  () => import("@/components/ParkDetail.vue")
);
const sideBar = computed(() => {
  return {
    component: visibleComponent.value === "ADD" ? AddPark : ParkDetail,
    props: {
      markerLatLng: markerLatLng.value,
      isOpen: isAddingOpen.value,
      park: parkDetail.value,
    },
    events: {
      close: onAddingSectionClose,
      newParkMarkerClick: onParkMarkerClick,
    },
  };
});

const onUserMarkerClick = (latLng: google.maps.LatLng) => {
  isAddingOpen.value = true;
  markerLatLng.value = latLng;
  visibleComponent.value = "ADD";
};

const onParkMarkerClick = (park: IPark) => {
  isAddingOpen.value = true;
  parkDetail.value = park;
  visibleComponent.value = "DETAIL";
};

const onAddingSectionClose = () => {
  isAddingOpen.value = false;
};
</script>

<style lang="scss">
.map {
  position: fixed !important; //google map has the position relative
  inset: 0;
  overflow: auto;
  display: grid;
  place-items: center;
}
</style>
