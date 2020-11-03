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

    <v-list :key="space.id" disabled="true">
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

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-account-group
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            v-text="space.qtdPeople"
          ></v-list-item-title>
          <v-list-item-subtitle>Capacidade</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-laptop
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-text=' space.computers ? "SIM" : "NÃO" '
          ></v-list-item-title>
          <v-list-item-subtitle>Computadores</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      </v-list>

      <v-btn
        @click="sendToDetail('detail-space',space)"
        icon
        :key="space.id"
      >
        <v-icon color="indigo" >mdi-plus</v-icon>
      </v-btn>

      <v-divider 
        v-if="index < spaces.length - 1"
        :key="index">
      </v-divider>
    </template>
  </v-card>
</template>

<script>
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');

export default {
  data: () => ({
    spaces: []
  }),
  async created() {
    let response = await http.getList('spaces');
    this.spaces = response.data;
  },
  methods: {
    async detailSpace(id) {
      this.$router.push('detail-space', id);
    },
    navegateTo(where) {
      this.$router.push({ name: where });
    },

    sendToDetail(where, data) {
      this.$router.push({ name: where, params: { space: data } });
    }
  }
};
</script>
<style lang="stylus" scoped></style>