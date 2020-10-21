<template>
  <v-card
    width="1400px" 
    class="mx-auto"
  >
  <template v-for="(space, index) in spaces">

    <v-card-title 
      v-text="space.name" 
      :key="space.id" 
      class="black--text pl-12 pt-12"
    >
    </v-card-title>

    <v-list :key="space.id" two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-map-marker
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title 
            v-text="space.localization"
          >
          </v-list-item-title>
          <v-list-item-subtitle>Escola Agrícola Jundiaí</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-btn
        icon
        :key="space.id"
      >
        <v-icon color="indigo">mdi-plus</v-icon>
      </v-btn>

    <v-divider 
      v-if="index < spaces.length - 1"
      :key="index">
    </v-divider>

<!-- 
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-phone
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>123</v-list-item-title>
          <v-list-item-subtitle>Ramal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-account
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>nome responsavel</v-list-item-title>
          <v-list-item-subtitle>Responsável</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      </v-list>
    </template>
  </v-card>
</template>
<script>
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');
export default {
  data: () => ({
    spaces: [],
    fields: [
      { value: "id", text: "id", sortable: true },
      { value: "name", text: "Nome", sortable: true },
      { value: "localhost", text:"Localização", sortable: true},
      { value: "qtdPeople", text: "Capacidade", sortable: true },
      { value: "description", text: "Descrição" },
    ],
  }),
  async created() {
    let response = await http.getList('spaces');
    this.spaces = response.data;
    console.log(response.data)
  },
};
</script>
<style lang="stylus" scoped></style>