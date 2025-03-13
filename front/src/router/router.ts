import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import TestPage from "../pages/TestPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/test", component: TestPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
