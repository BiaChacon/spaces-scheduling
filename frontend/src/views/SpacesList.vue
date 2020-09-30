<template>
  <div>
    <p>Lista de espaços</p>
    <b-table striped hover :items="spaces" :fields="fields" fixed width="200px"></b-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    spaces: [],
    fields : [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'qtdPeople', label: 'Capacidade', sortable: true },
      { key: 'description', label: 'Descrição' },
      { key: 'localization', label: 'Localização' },
      { key: 'description', label: 'Responsavel' }
    ]
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