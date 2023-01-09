<template>
  <Transition name="slide-in" appear>
    <div v-if="isOpen" class="container">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: "close"): void }>();
defineProps<{
  isOpen: boolean;
}>();

const emitCloseEvent = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  height: 100vh;
  width: 20rem;
  background-color: white;
  right: 0;
  top: 0;
  border-radius: 2rem 0 0 2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;

  background: rgb(255 255 255 / 20%);
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 70%);
  backdrop-filter: blur(18px);
}

.slide-in-leave-active,
.slide-in-enter-active {
  transition: all 0.3s ease-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(20rem);
}

@media (orientation: portrait) {
  .container {
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    height: 20rem;
    width: 100vw;
    border-radius: 2rem 2rem 0 0;
    box-shadow: 1rem 0 2rem rgb(0 0 0 / 70%);
  }

  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translateY(20rem);
  }
}
</style>
