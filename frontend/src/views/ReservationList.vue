<template>
  <div>
    <p>Reservas</p>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";
const http = new ApiService("spaces");

export default {
  data: () => ({
    reservations: [],
  }),
  async mounted() {
    const response = await http.getList();
    this.reservations = response.data;
  },
};
</script>