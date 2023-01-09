<template>
  <div class="file-input">
    <input
      type="file"
      multiple
      @change="onInputChange"
      accept="image/png, image/jpg, image/jpeg"
      id="image-input"
      hidden
      ref="inputRef"
    />
    <label class="file-input__image-container" for="image-input">
      <img class="file-input__image" src="src/assets/add_photo.png" />
    </label>
  </div>
  <p @click="onTextClick" class="file-input__text">Nahrajte fotografie parku</p>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

const emit = defineEmits<{ (e: "on-change", fileList: File[]): void }>();
const inputRef: Ref<HTMLElement | null> = ref(null);

const onInputChange = (event: Event) => {
  const fileList = Array.from(
    (event.target as HTMLInputElement).files as FileList
  );
  emit("on-change", fileList);
};

const onTextClick = () => {
  inputRef.value?.click();
};
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  position: relative;
}

.file-input {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  padding: 0 2rem;

  &__image-container {
    display: flex;
    position: relative;
  }

  &__image {
    margin-bottom: 0.5rem;
    min-width: 0;
    opacity: 0.8;
    cursor: pointer;
  }

  &__text {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    opacity: 0.8;
    cursor: pointer;
  }
}

@media (orientation: portrait) {
  .file-input {
    flex-direction: row;
    flex: 1;
    display: flex;
    padding-top: 2rem;
  }
}
</style>
