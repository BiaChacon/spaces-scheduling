<template>
  <div>
    Reservas do espaço :
    <!-- <div v-if="space_id"> -->
    <!-- <strong>{{ space_id }} </strong> -->
    <div v-for="reserve in spacesReserves" :key="reserve.id">
      <div v-if="reserve.normal">
        <strong>Data da Reserva: </strong>
        <span>{{ reserve.dateStart }}</span>
      </div>
      <div v-else>
        <strong>Data Inicio: </strong>
        <span>{{ reserve.dateStart }}</span>
        <br />
        <strong>Data Final: </strong>
        <span>{{ reserve.dateEnd }}</span>
      </div>
      <div>{{ reserve.justification }}</div>
      <div>horario {{ reserve.schedule }}</div>
      <hr>
    </div>
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
    this.spacesReserves = result.data;
  },
};
</script>

<style>
</style>