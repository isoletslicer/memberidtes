import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useAwardStore = defineStore({
  id: "award",
  state: () => ({
    baseUrl: `http://localhost:3000`,
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    awards: [],
    awardByID: {},
  }),
  actions: {
    async fetchAward(type, point) {
      try {
        let result = await axios({
          method: "GET",
          url: `${this.baseUrl}/awards`,
          headers: {
            access_token: localStorage.access_token
          },
          params: {
            // params dan query di hitung argumen yg sama di dalam axios
            type: type,
            point: point,
            page: this.currentPage
          }
        })
        // console.log(result.data, "<<<< masuk data nya bos");
        // console.log(result.data, '<<< ini all data')
        this.awards = result.data.Award;
        this.currentPage = result.data.currentPage
        this.totalItems = result.data.totalItems
        this.totalPages = result.data.totalPages
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `${error.response.data.message}`,
        });
      }
    },

  },
});
