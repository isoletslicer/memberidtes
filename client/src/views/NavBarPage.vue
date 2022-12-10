<script>
import { mapActions, mapWritableState } from "pinia";
import { useLoginMethodStore } from "../stores/loginMethod";

export default {
  computed: {
    ...mapWritableState(useLoginMethodStore, ["isLogin", "username_logged"]),
    ...mapActions(useLoginMethodStore, ["logOut"]),
  },
  methods: {
    async logoutMethod() {
      await this.logOut;
    },
  },

  // biar ttp login meski di refresh pasksa
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
      this.username_logged = localStorage.getItem("user_logged");

    }
  },
};
</script>

<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">
        <small>Award App</small>
      </a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- Link -->
        <li v-if="isLogin === true" class="nav-item">
          <router-link to="/award" class="nav-link">Award</router-link>
        </li>
        <li v-if="isLogin === false" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li v-if="isLogin === true" class="nav-item">
          <a class="nav-link">Card</a>
        </li>
        <li v-if="isLogin === true" class="nav-item">
          <a class="nav-link">Profles</a>
    </li>
      </ul>
      <div v-if="isLogin === true" class="navbar-brand">
        hola, {{ username_logged }}
      </div>
      <div v-if="isLogin === true" class="navbar-brand">
        <a
          @click.prevent="logoutMethod"
          class="navbar-brand btn btn-danger"
          href=""
          ><i class="bi bi-power"></i> Log Off</a
        >
      </div>
    </div>
  </nav>
</template>

<style></style>
