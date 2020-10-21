<template>
  <v-card width="700px" class="mx-auto">
    <v-card-title class="display-1">
    </v-card-title>
    <v-data-table :items="spaces" :headers="fields" loading-text="Sem dados">
    </v-data-table>
  </v-card>
</template>
<script>
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');
export default {
  data: () => ({
    spaces: [],
    fields: [
      { value: "name", text: "Nome", sortable: true },
      { value: "qtdPeople", text: "Capacidade", sortable: true },
      { value: "description", text: "Descrição" },
    ],
  }),
  async created() {
    let response = await http.getList('spaces');
    this.spaces = response.data;
  },
};
</script>
<style lang="stylus" scoped></style>