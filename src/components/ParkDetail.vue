<template>
  <SideBar :is-open="isOpen" @close="emitCloseEvent">
    <AnimatedImageList
      :image-urls="imageSourceUrls"
      :delete-enabled="false"
    ></AnimatedImageList>
  </SideBar>
</template>

<script setup lang="ts">
import { useImageApi } from "@/composables/api/imageApi.composlabe";
import { axiosKey } from "@/injection-keys";
import type { IPark } from "@/models/park.interface";
import { useAsyncState } from "@vueuse/core";
import type { AxiosInstance } from "axios";
import { computed, inject } from "vue";
import AnimatedImageList from "./AnimatedImageList.vue";
import SideBar from "./SideBar.vue";

const emit = defineEmits<{ (e: "close"): void }>();
const props = defineProps<{
  isOpen: boolean;
  park: IPark;
}>();
const axios: AxiosInstance = inject(axiosKey)!;
const { getParkImages } = useImageApi(axios);
const { state } = useAsyncState(getParkImages(props.park.park_id), []);

const imageSourceUrls = computed(() => {
  return state.value.map(
    (parkImage) =>
      `https://d10zzuzru2k6tc.cloudfront.net/${parkImage.image_name}`
  );
});

const emitCloseEvent = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
