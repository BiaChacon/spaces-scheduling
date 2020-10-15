<template>
  <div>
    <p>Reservas</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    reservations: [],
    
  }),
  async created() {
    // GET request using axios with async/await
    const response = await axios.get("http://localhost:3333/reservations");
    console.log(response.data);
    this.reservations = response.data;
  },
};
</script>