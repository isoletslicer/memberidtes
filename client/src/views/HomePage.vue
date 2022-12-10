<script>
import { mapActions, mapState, mapWritableState } from "pinia";

import CardAward from "../components/CardAward.vue";
import SearchBar from "../components/SearchBar.vue";
import { useAwardStore } from "../stores/award";
import Swal from "sweetalert2";
export default {
  components: {
    CardAward,
    SearchBar,
  },
  computed: {
    ...mapWritableState(useAwardStore, [
      "awards",
      "currentPage",
      "totalItems",
      "totalPages",
    ]),
  },
  data() {
    return {
      // state nya filter by name
      filter: {
        checkedType: [],
        point : null
      },
    };
  },
  methods: {
    ...mapActions(useAwardStore, ["fetchAward"]),

    searchMethod() {
      let queriedType = this.filter.checkedType;
      let queriedPoint = this.filter.point
      let type = String(queriedType);
      this.fetchAward(type, queriedPoint);
    },
    goToPrevPage() {
      if (this.currentPage > 0) {
        let queriedType = this.filter.checkedType;
        let queriedPoint = this.filter.point
        let type = String(queriedType);
        this.currentPage -= 1;
        this.fetchAward(type,queriedPoint);
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages - 1) {
        let queriedType = this.filter.checkedType;
        let queriedPoint = this.filter.point
        let type = String(queriedType);
        this.currentPage += 1;
        this.fetchAward(type, queriedPoint);
      }
    },
    resetSearchMethod() {
      this.filter.checkedType = [];
      this.filter.point = null
      this.fetchAward();
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Search Reset!",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  },
  created() {
    this.fetchAward();
  },
};
</script>
<template>
  <!-- Header-->
  <header class="bg-danger py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="text-center text-white">
        <h1 class="display-4 fw-bolder">Awards</h1>
        <p class="lead fw-normal text-white-50 mb-0">find your awards</p>
      </div>
    </div>
  </header>
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <!-- <SearchBar /> -->
      <div class="col col-md-5 align-content-center">
        <form
          @submit.prevent="searchMethod"
          class="d-flex input-group w-auto mb-4"
        >
          <input
            type="checkbox"
            id="vouchers"
            value="vouchers"
            v-model="filter.checkedType"
          />
          <label for="vouchers">voucher</label>

          <input
            type="checkbox"
            id="products"
            value="products"
            v-model="filter.checkedType"
          />
          <label for="products">product</label>

          <input
            type="checkbox"
            id="giftcards"
            value="giftcards"
            v-model="filter.checkedType"
          />
          <label for="giftcards">giftcard</label>

          <input type="range" id="point" name="point" list="tickmarks" v-model="filter.point" min=100000 max=1000000 step="50000"/>

          <datalist id="tickmarks">
            <option value="100000" label="100.000"></option>
            <option value="250000" label="250.000"></option>
            <option value="500000" label="500.000"></option>
            <option value="750000" label="750.000"></option>
            <option value="1000000" label="1000.000"></option>
          </datalist>
          <br/>
          <button
            class="btn btn-warning me-4"
            type="submit"
            data-mdb-ripple-color="dark"
          >
            Search
          </button>
          <button class="btn btn-danger" @click.prevent="resetSearchMethod">
            <i class="bi bi-bootstrap-reboot"></i> Reset Search
          </button>
        </form>
      </div>
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <CardAward v-for="award in awards" :key="award.id" :award="award" />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li @click.prevent="goToPrevPage" class="page-item">
          <a class="page-link">Previous</a>
        </li>
        <li v-for="currentPage in totalPages" class="page-item">
          <a class="page-link">{{ currentPage }}</a>
        </li>
        <li @click.prevent="goToNextPage" class="page-item">
          <a class="page-link">Next</a>
        </li>
      </ul>
    </nav>

    <!-- <PaginationBar /> -->
  </section>
</template>

<style>
datalist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 200px;
}

option {
  padding: 0;
}

input[type="range"] {
  width: 200px;
  margin: 0;
}</style>
