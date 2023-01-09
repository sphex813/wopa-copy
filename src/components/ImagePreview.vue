<template>
  <div class="preview">
    <div v-if="isLoading" class="preview__loading"></div>
    <img v-if="!isLoading" class="preview__image" :src="imageSrc" />
    <div v-if="deleteEnabled" class="preview__delete" @click="emitDelete">
      <img src="src/assets/trash_white.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImage } from "@vueuse/core";

const emit = defineEmits<{ (e: "delete-click", imageSrc: string): void }>();
const props = defineProps<{ imageSrc: string; deleteEnabled: boolean }>();
const { isLoading } = useImage({ src: props.imageSrc });

const emitDelete = () => {
  emit("delete-click", props.imageSrc);
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  position: relative;

  &__loading {
    border-radius: 1rem;
    min-height: 10rem;
    min-width: 20rem;
    flex: 1;
    background-size: 200% 200%;
    background-image: linear-gradient(
      90deg,
      rgb(221, 221, 221) 0%,
      rgb(255, 255, 255) 10%,
      rgb(221, 221, 221) 20%,
      rgb(221, 221, 221) 100%
    );
    animation: loading-skeleton 1s ease-out infinite;
  }

  &__image {
    min-width: 0;
    border-radius: 1rem;
  }

  &__delete {
    position: absolute;
    top: 0;
    right: 0;
    height: 2.2rem;
    width: 2.2rem;
    background-color: black;
    border-radius: 100%;
    display: flex;
    padding: 0.4rem;
    margin: 0.5rem;
    box-shadow: rgb(0 0 0 / 50%) 0 0 0.5rem;
    cursor: pointer;

    &:active {
      box-shadow: none;
    }
    &:hover {
      background-color: rgb(214, 0, 0);
    }
  }

  @keyframes loading-skeleton {
    0% {
      background-position: 40%;
    }
    100% {
      background-position: -100%;
    }
  }
}
</style>
