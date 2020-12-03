<template>
  <v-card width="1400px" class="mx-auto">
    <template v-for="(space, index) in spaces">
      <v-card-title
        v-text="space.name"
        :key="space.id"
        disabled="true"
        class="mx-5"
        style="font-size: 2em; color: #0077c2"
      >
        >
      </v-card-title>

      <v-card-text :key="space.id">
        <v-list disabled="true">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-map-marker </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="space.localization">
              </v-list-item-title>
              <v-list-item-subtitle>Localização</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-account-group </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="space.qtdPeople"></v-list-item-title>
              <v-list-item-subtitle>Capacidade</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-laptop </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="space.computers ? 'SIM' : 'NÃO'"
              ></v-list-item-title>
              <v-list-item-subtitle>Computadores</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions :key="space.id">
        <v-row align="center" justify="center">
          <v-btn
            @click="sendToDetail('detail-space', space)"
            rounded
            small
            dark
            color="blue"
          >
            <v-icon left>mdi-plus</v-icon>
            Detalhes
          </v-btn>
        </v-row>
      </v-card-actions>
      <v-divider v-if="index < spaces.length - 1" :key="index"> </v-divider>
    </template>
  </v-card>
</template>

<script>
import ApiService from "../services/ApiService";
const http = new ApiService("spaces");

export default {
  data: () => ({
    spaces: [],
  }),
  async created() {
    let response = await http.getList();
    this.spaces = response.data;
    this.$store.commit("setTitle", "Espaços");
  },
  methods: {
    async detailSpace(id) {
      this.$router.push("detail-space", id);
    },
    navegateTo(where) {
      this.$router.push({ name: where });
    },

    sendToDetail(where, data) {
      this.$router.push({ name: where, params: { space: data } });
    },
  },
};
</script>

<style lang="stylus" scoped></style>