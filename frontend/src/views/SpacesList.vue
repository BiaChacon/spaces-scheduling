<template>
  <div>
    <p>Lista de espaços</p>
    <b-table striped hover :items="spaces"></b-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    spaces: []
  }),
  async created() {
    // GET request using axios with async/await
    const response = await axios.get("http://localhost:3333/spaces");
    console.log(response.data);
    this.spaces = response.data;
  },
};
</script>
<style lang="stylus" scoped></style>