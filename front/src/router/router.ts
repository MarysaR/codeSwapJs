import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import UserListPage from "../pages/UserListPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users", component: UserListPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
