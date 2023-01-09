<script setup lang="ts">
import ModalContainer from "./components/ModalContainer.vue";
import { useParksStore } from "./stores/parks.store";
import { useUserStore } from "./stores/user.store";

useParksStore().getParks();
const { login, user } = useUserStore();

console.log(user);
if (!user) {
  //todo dorobit google one tap
}
</script>

<template>
  <RouterView />
  <ModalContainer></ModalContainer>
</template>

<style scoped></style>
