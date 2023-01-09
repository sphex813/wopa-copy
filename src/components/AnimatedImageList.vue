<template>
  <TransitionGroup
    v-dragscroll
    @dragscrollstart="onDragStart"
    @click.capture="onDragClick"
    v-if="imageUrls.length"
    name="image-list"
    tag="div"
    class="image-container"
  >
    <ImagePreview
      class="image-container__item"
      v-for="imageSrc in imageUrls"
      :key="imageSrc"
      :image-src="imageSrc"
      @delete-click="deleteImage"
      :delete-enabled="deleteEnabled"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import ImagePreview from "./ImagePreview.vue";
let dragged = false;
let dragTimeout: number | undefined;

const props = withDefaults(
  defineProps<{
    imageUrls: string[];
    deleteEnabled?: boolean;
  }>(),
  { deleteEnabled: true }
);

const emit = defineEmits<{
  (e: "on-image-delete", indexOfDeleted: number): void;
}>();

const onDragStart = () => {
  clearTimeout(dragTimeout);

  dragged = false;
  dragTimeout = setTimeout(() => {
    dragged = true;
  }, 100);
};

const onDragClick = (event: Event) => {
  if (dragged) {
    event.stopPropagation();
  }

  dragged = false;
};

const deleteImage = (imageSrc: string) => {
  const indexOfDeleted = props.imageUrls.indexOf(imageSrc);
  if (indexOfDeleted !== -1) {
    emit("on-image-delete", indexOfDeleted);
  }
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 0.5rem;
  border-radius: 1.3rem 0 0 1.3rem;
  cursor: grab;

  &__item {
    z-index: 1;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.image-list-move {
  transition: opacity 0s ease-in, transform 0.3s ease-in;
}
.image-list-enter-active,
.image-list-leave-active {
  transition: opacity 0.3s ease-in;
}

.image-list-enter-from,
.image-list-leave-to {
  opacity: 0;
}

.image-list-leave-active {
  position: absolute;
  width: 100%;
}

@media (orientation: portrait) {
  .image-container {
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;
    border-radius: 1.3rem 1.3rem 0 0;
  }

  .image-list-leave-active {
    height: 100%;
  }
}
</style>
