<template>
  <p v-if="user" @click="logout">Logout</p>
  <GoogleLogin v-if="!user" :callback="login">Login</GoogleLogin>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { GoogleLogin } from "vue3-google-login";
const { user, login, logout } = useUserStore();
</script>

<style lang="scss" scoped></style>
