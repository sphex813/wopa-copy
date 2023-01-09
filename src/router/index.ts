import { createRouter, createWebHistory } from "vue-router";
import { loadComponent } from "./router-helper";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "map",
      component: loadComponent("MapView"),
    },
    { path: "/:pathMatch(.*)*", redirect: { name: "map" } },
  ],
});

export default router;
