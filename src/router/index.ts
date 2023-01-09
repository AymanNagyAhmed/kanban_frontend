import Vue from "vue";
import VueRouter, { type NavigationGuard } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import Auth from "../store/persist/Auth.persist";

Vue.use(VueRouter);

const authGuard: NavigationGuard = async (to, _, next) => {
  if (!Auth.isAuthenticated() && to.name !== "auth") {
    console.debug("Not Authenticated");
    next({ name: "Auth" });
  }
  next();
};
const loggedInGuard: NavigationGuard = async (to, _, next) => {
  if (Auth.isAuthenticated()) {
    console.debug("Already Logged In");
    next({ name: "home" });
  }
  next();
};
const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: authGuard,
    },
    {
      path: "/auth",
      name: "Auth",
      component: AuthView,
      beforeEnter: loggedInGuard,
    },
  ],
});

export default router;
