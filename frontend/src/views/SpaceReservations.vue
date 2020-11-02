<template>
  <div>
    Reservas do espaço :
    <!-- <div v-if="space_id"> -->
    <!-- <strong>{{ space_id }} </strong> -->
    <li v-for="reserve in spacesReserves" :key="reserve.id">
      <ul>{{ reserve.justification }}</ul>
    </li>
    <!-- </div> -->
  </div>
</template>

<script>
// import ApiService from '../services/ApiService';
// const http = new ApiService('space-reservations');
import axiosConf from "../services/config";

export default {
  props: ["space_id"],
  data: () => ({
    spacesReserves: [],
  }),
  async created() {
    window.console.log(this.space_id);
    const result = await axiosConf.get("space-reservations", {
      params: { spaceId: this.space_id },
    });
    window.console.log(result.data);
    this.reserveList = result.data;
  },
};
</script>

<style>
</style>