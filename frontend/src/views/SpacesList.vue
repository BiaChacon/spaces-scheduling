<template>
  <!-- <div>
    <p>Lista de espaços</p>
    <b-table striped hover :items="spaces" :fields="fields" fixed width="200px"></b-table>
  </div> -->
  <v-card width="700px" class="mx-auto">
    <v-card-title class="display-1">
      <!-- {{ title }} -->
      <!-- <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field> -->
    </v-card-title>
    <v-data-table :items="spaces" :headers="fields" loading-text="Sem dados">
      <!-- :search="search"
       -->
      <!-- <template v-slot:item.created_at="{ item }">
        <v-chip dark>{{ item.created_at | formatDate }}</v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-card width="170px" @click="click('occurrence_details', item)">
          <v-icon color="secondary" large>list_alt</v-icon>
          <span class="font-weight-bold">Mais Informações</span>
        </v-card>
      </template> -->
    </v-data-table>
  </v-card>
</template>
<script>
// import axios from "axios";
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');
export default {
  data: () => ({
    spaces: [],
    fields: [
      { value: "name", text: "Nome", sortable: true },
      { value: "qtdPeople", text: "Capacidade", sortable: true },
      { value: "description", text: "Descrição" },
      // { value: "localization", text: "Localização" },
      // { value: "description", text: "Responsavel" },
    ],
  }),
  async created() {
    let response = await http.getList('spaces');
    this.spaces = response.data;
  },
};
</script>
<style lang="stylus" scoped></style>