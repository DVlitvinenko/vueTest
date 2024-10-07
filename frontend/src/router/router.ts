import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Dash from "../components/Dash.vue";

const routes = [
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },

  {
    path: "/",
    name: "dash",
    component: Dash,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
