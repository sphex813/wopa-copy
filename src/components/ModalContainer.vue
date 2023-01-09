<template>
  <Teleport to="body">
    <Transition :name="animationName">
      <div
        v-if="modalRef"
        class="modal-mask"
        :class="{ 'modal-mask--no-background': !modalMaskRef }"
      >
        <div class="modal-wrapper">
          <component
            ref="modalElement"
            :is="modalRef"
            :modal-data="modalDataRef"
            @close="onClose"
            @dismiss="onDismiss"
          ></component>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useModals } from "@/composables/modals.composable";
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";
const { modalRef, modalDataRef, modalMaskRef, closeModal } = useModals();
const modalElement = ref(null);
const animationName = computed(() => {
  return modalMaskRef.value ? "mask" : "no-mask";
});

const onClose = <T>(result?: T) => {
  closeModal("CLOSE", result);
};

const onDismiss = () => {
  closeModal("DISMISS");
};

onClickOutside(modalElement, onDismiss);
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  &--no-background {
    background: none;
  }
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.mask-enter-active,
.mask-leave-active {
  transition: all 0.2s ease-in-out;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.no-mask-enter-active,
.no-mask-leave-active {
  transition: all 0.2s ease-in-out;
}

.no-mask-enter-from,
.no-mask-leave-to {
  scale: 0;
}
</style>
