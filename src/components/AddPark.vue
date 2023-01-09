<template>
  <SideBar :is-open="isOpen" @close="addPark">
    <FileInput v-if="!imageSourceUrls.length" @on-change="onInputChange" />
    <AnimatedImageList
      :image-urls="imageSourceUrls"
      @on-image-delete="deleteImage"
    ></AnimatedImageList>
    <div class="buttons-container">
      <CustomButton
        class="buttons-container__item"
        v-if="imageSourceUrls.length"
        @click="addPark"
        :loading="loading"
        >Add park</CustomButton
      >
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ADD_PARK_DONE, NOT_LOGGED_IN } from "@/assets/text-modal-resources";
import { useModals } from "@/composables/modals.composable";
import { useUploadFiles } from "@/composables/upload-files.composable";
import type { IPark } from "@/models/park.interface";
import { useGoogleMapStore } from "@/stores/googleMap.store";
import { useParksStore } from "@/stores/parks.store";
import { useUserStore } from "@/stores/user.store";
import { useAsyncQueue, type UseAsyncQueueResult } from "@vueuse/core";
import { AxiosError } from "axios";
import { onUnmounted, ref, toRef, type Ref } from "vue";
import AnimatedImageList from "./AnimatedImageList.vue";
import CustomButton from "./CustomButton.vue";
import FileInput from "./FileInput.vue";
import SideBar from "./SideBar.vue";
const emit = defineEmits<{
  (e: "close"): void;
  (e: "new-park-marker-click", park: IPark): void;
}>();
const props = defineProps<{
  isOpen: boolean;
  markerLatLng: google.maps.LatLng | null;
}>();
let fileList: File[] = [];
let imageSourceUrls: Ref<string[]> = ref([]);
const { uploadFiles } = useUploadFiles();
const user = toRef(useUserStore(), "user");
const { insertPark } = useParksStore();
const { getUserMarker, createParkMarker } = useGoogleMapStore();
const { openErrorModal, openTextModal } = useModals();
const loading = ref(false);

onUnmounted(() => {
  clearAllImages();
});

const onInputChange = (fileListInput: File[]) => {
  clearAllImages();
  fileList = fileListInput;
  imageSourceUrls.value = [...fileList].map((url) => URL.createObjectURL(url));
};

const deleteImage = (indexOfDeleted: number) => {
  clearImage(indexOfDeleted);
};

const addPark = () => {
  const userId = user.value?.user_id;
  if (userId) {
    loading.value = true;
    const { result } = useAsyncQueue(
      [
        () => insertPark(props.markerLatLng!, userId),
        (park: IPark) => uploadFiles(fileList, park.park_id, userId),
      ],
      {
        onFinished: () => onAddParkFinish(result),
      }
    );
  } else {
    emit("close");
    openTextModal(NOT_LOGGED_IN);
  }
};

const onAddParkFinish = (
  result: [UseAsyncQueueResult<IPark>, UseAsyncQueueResult<string[]>]
) => {
  const error = result.find((x) => x.state === "rejected")?.data;

  if (!error && result[0].data) {
    addNewParkMarker(result[0].data);
    clearAllImages();
    openTextModal(ADD_PARK_DONE);
  } else {
    handleAddParkError(error);
  }
  emit("close");

  loading.value = false;
};

const handleAddParkError = (error: any) => {
  console.error("park ADD error", error);

  let hint = "";
  if (error instanceof AxiosError) {
    hint = error.response?.data.message;
  } else if (error instanceof Error) {
    hint = error.message;
  }

  openErrorModal("A workout park couldn't be added.", hint);
};

const clearImage = (index: number) => {
  imageSourceUrls.value.splice(index, 1);
  URL.revokeObjectURL(imageSourceUrls.value[index]);
  fileList.splice(index, 1);
};

const clearAllImages = () => {
  [...fileList].forEach(() => {
    clearImage(0);
  });
};

const addNewParkMarker = (park: IPark) => {
  getUserMarker().setMap(null);
  createParkMarker(park, (park) => {
    emit("new-park-marker-click", park);
  });
};
</script>

<style lang="scss" scoped>
.buttons-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  gap: 0.5rem;

  &__item {
    flex: 1;
    cursor: pointer;
  }
}

@media (orientation: portrait) {
  .buttons-container {
    flex-direction: row;
  }
}
</style>
