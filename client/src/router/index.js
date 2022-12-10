import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "../views/HomePage.vue";
import NavBarPage from "../views/NavBarPage.vue";
import NoFoundPage from "../views/NoFoundPage.vue";
import LoginPage from "../views/LoginPage.vue";
import Swal from 'sweetalert2';
import LandingPage from "../views/LandingPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: '/award',
      name: 'award',
      component: HomePage
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NoFoundPage },

  ]
})

router.beforeEach((to, from) => {
  // navigation guard apabila udah login/logout biar ga berabe
  if (!localStorage.getItem("access_token") && to.name === "award") {
    Swal.fire({
      icon: "error",
      title: `Please login to access this feature`,
    });
    return "/login";
  } else if (localStorage.getItem("access_token") && to.name === "login") {
    Swal.fire({
      icon: "error",
      title: `You already have login, bro`,
    });
    return "/";
  }
});


export default router
