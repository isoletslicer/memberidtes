<script>
import { mapActions, mapState } from "pinia";
import { useLoginMethodStore } from "../stores/loginMethod";

export default {
  props: ["award"],
  methods: {
    ...mapState(useLoginMethodStore, ["isLogin"]),
  },
};
</script>

<template>
  <div class="col mb-5">
    <div class="card h-100 bg-dark text-white">
      <!-- Product image-->
      <img class="card-img-top" :src="award.imgUrl" />
      <!-- Product details-->
      <div class="card-body p-4">
        <div class="text-center">
          <!-- Product name-->
          <h5 class="fw-bolder">{{ award.name }}</h5>
          <button disabled="disabled">{{award.type}}</button>
          <h5 class="fw-bolder">{{ new Intl.NumberFormat('de-DE').format(award.point)}} Point</h5>

          <!-- Product Category-->
        </div>
      </div>
      <!-- Product actions-->
    </div>
  </div>
</template>

<style></style>
