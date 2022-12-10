<script>
import HomePage from "./views/HomePage.vue";
import NavBarPage from "./views/NavBarPage.vue";
import NoFoundPage from "./views/NoFoundPage.vue";
import LoginPage from "./views/LoginPage.vue";
export default {
  components: {
    HomePage,
    NavBarPage,
    NoFoundPage,
    LoginPage,
  },

};
</script>

<template>
  <NavBarPage />


  <router-view></router-view>
</template>

<style>
body {
  background-color: aquamarine;
}
</style>
