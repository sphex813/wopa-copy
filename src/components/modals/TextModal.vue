<template>
  <Transition appear>
    <div class="text-modal">
      <h1 class="text-modal__title" v-html="modalData?.title"></h1>
      <div class="text-modal__text-container">
        <p class="text-modal__text" v-html="modalData?.text"></p>
        <p
          class="text-modal__text"
          v-if="modalData?.hint"
          v-html="modalData?.hint"
        ></p>
      </div>
      <div class="text-modal__buttons-container">
        <h4
          v-if="modalData?.cancelButtonText"
          class="text-modal__button"
          @click="onClose(false)"
          v-html="modalData?.cancelButtonText"
        ></h4>
        <h4
          class="text-modal__button"
          @click="onClose(true)"
          v-html="modalData?.confirmButtonText"
        ></h4>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { TextModalData } from "@/models/modal-types";

//todo vue doesnt support importing types for emits yet, should be fixed in future release
export type ModalEmits<T> = {
  (e: "close", result: T): void;
};

//todo vue doesnt support importing types for props yet, should be fixed in future release
export type ModalProps<T> = {
  modalData?: T;
};

const emit = defineEmits<ModalEmits<boolean>>();
defineProps<ModalProps<TextModalData>>();

const onClose = (result: boolean) => {
  emit("close", result);
};
</script>

<style lang="scss" scoped>
.text-modal {
  background: white;
  background: rgb(255 255 255 / 20%);
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 70%);
  backdrop-filter: blur(18px);
  border-radius: 2rem;
  padding: 2rem 2rem 1rem 2rem;
  margin: 2rem;

  &__title {
  }

  &__text-container {
    font-size: 1.3rem;
    padding: 1rem 0.5rem;
  }

  &__buttons-container {
    display: flex;
  }

  &__button {
    border-top: 1px solid;
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
    flex: 1;

    &:first-child {
      border-right: 1px solid;
    }

    &:only-child {
      border-right: none;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  scale: 0;
}

@media only screen and (max-width: 600px) {
  .text-modal {
    &__buttons-container {
      flex-direction: column;
    }

    &__button {
      &:first-child {
        border-right: none;
      }
    }
  }
}
</style>
