<template>
  <div class="menu">
    <TransitionGroup name="list">
      <div
        tabindex="0"
        v-for="item in menuItems"
        :key="item.name"
        @click="item.callback"
        class="menu__item"
      >
        <component :is="item.component" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {
  markRaw,
  onMounted,
  ref,
  TransitionGroup,
  type Component,
  type Ref,
} from "vue";
import LoginButton from "../LoginButton.vue";
type MenuItem = { component: Component; callback: () => void; name: string };
const emit = defineEmits<{ (e: "dismiss"): void }>();
const menuItems: Ref<MenuItem[]> = ref([]);

onMounted(() => {
  animateMenu();
});

const animateMenu = () => {
  const items: MenuItem[] = [
    { component: markRaw(LoginButton), callback: onDismiss, name: "login" },
  ];

  items.map((menuItem: MenuItem, index: number) => {
    setTimeout(() => {
      menuItems.value.push(menuItem);
    }, index * 200);
  });
};

const onDismiss = () => {
  emit("dismiss");
};
</script>

<style lang="scss" scoped>
.menu {
  font-size: 5rem;
  color: white;
  font-weight: 100;
  text-transform: lowercase;

  &__item {
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      transform: scale(1.5);
      transition: all 0.3s ease-out;
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10rem);
}
</style>
