<template>
  <button class="custom-button" :disabled="loading">
    <h4 v-if="!loading"><slot></slot></h4>
    <img class="spinner" v-if="loading" src="src/assets/spinner.png" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ loading: boolean }>();
</script>

<style lang="scss" scoped>
.custom-button {
  text-align: center;
  background: #252525;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  box-shadow: 0.2rem 0.2rem 0.7rem rgb(0 0 0 / 70%);

  &:hover {
    opacity: 0.8;
  }

  &:disabled,
  &:active {
    box-shadow: none;
  }
}

.spinner {
  margin: -0.6rem;
  width: 2rem;
  animation: rotate 0.5s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
