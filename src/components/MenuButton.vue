<template>
  <img @click="openMenu" class="menu-icon" :src="icon" />
</template>

<script setup lang="ts">
import burgerIcon from "@/assets/burger_icon.png";
import userIcon from "@/assets/user_icon.png";
import { useModals } from "@/composables/modals.composable";
import { useUserStore } from "@/stores/user.store";
import { computed, defineAsyncComponent, toRef } from "vue";
const { openModal } = useModals();

const user = toRef(useUserStore(), "user");
let icon = computed(() => {
  return user?.value ? userIcon : burgerIcon;
});

const openMenu = () => {
  const MenuComponent = defineAsyncComponent(
    () => import("@/components/modals/MenuComponent.vue")
  );

  openModal(MenuComponent);
};
</script>

<style lang="scss" scoped>
.menu-icon {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  border-radius: 100%;
  box-shadow: rgb(0 0 0 / 50%) 0 0 0.5rem;
  cursor: pointer;

  &:active {
    box-shadow: none;
  }
}
</style>
