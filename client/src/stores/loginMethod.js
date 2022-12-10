import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2"

export const useLoginMethodStore = defineStore({
  id: "loginMethod",
  state: () => ({
    baseUrl: `http://localhost:3000`,
    username_logged: '',
    isLogin: false,
  }),
  actions: {
    async login(email) {
      try {
        let result = await axios({
          method: "POST",
          url: `${this.baseUrl}/login`,
          data: {
            email: email,
          },
        });
        // console.log(result)
        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("user_logged", result.data.emailFind);
        this.username_logged = localStorage.getItem("user_logged");

        this.isLogin = true;
        this.router.push("/award");

        Swal.fire({
          position: "center",
          icon: "success",
          title: `Logged in as ${result.data.emailFind}`,
          showConfirmButton: true,
          // timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `${error.response.data.message}`,
        });
      }
    },
    async logOut() {
      localStorage.clear();
      this.username_logged = "";
      this.isLogin = false;
      this.router.push("/");
      // console.log("u logout boi");

      Swal.fire({
        position: "center",
        icon: "warning",
        title: `You are logged Off. Please login`,
        showConfirmButton: true,
      });
    },
  },
});