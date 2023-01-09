import { createPinia } from "pinia";
import { createApp, markRaw } from "vue";
import { axiosKey } from "./injection-keys";

import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import VueDragscroll from "vue-dragscroll";
import vue3GoogleLogin from "vue3-google-login";

import "@/assets/main.css";

const app = createApp(App);
const axiosInstance = axios.create({
  baseURL: "http://192.168.0.190:3000",
});

const pinia = createPinia();
pinia.axios = markRaw(axiosInstance);
app.use(pinia);
app.use(router);
app.use(VueDragscroll);
app.use(vue3GoogleLogin, {
  clientId:
    "189328650763-ffnasfd6kg9i2o4iekr4gj4htcgcm391.apps.googleusercontent.com",
});

app.provide(axiosKey, axiosInstance);

app.mount("#app");
