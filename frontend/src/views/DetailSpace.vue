<template>
  <div style="margin: 20px">
    <v-card elevation="2" shaped color="#fff" style="margin-bottom: 50px">
      <v-card-title class="mx-5" style="font-size: 3em; color: #0077c2">
        {{ space.name }}
      </v-card-title>

      <v-card-text>
        <v-list color="#fff" disabled="true">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-home-circle-outline </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="space.description">
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-information-outline </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="space.justification">
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue">
                {{
                  space.special ? "mdi-star-outline" : "mdi-star-off-outline"
                }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="space.special ? 'Espaço Especial' : 'Espaço Normal'"
              >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-account-outline </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="space.responsible">
              </v-list-item-title>
              <v-list-item-subtitle>Responsável</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue"> mdi-map-marker </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="space.localization">
              </v-list-item-title>
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
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-btn outlined rounded text dark color="blue">
              <v-icon left> mdi-pencil </v-icon>
              Editar
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <Calendar :space_id="space.id" />
    <space></space>
    <SpaceReservations :space_id="space.id" />
  </div>
</template>
<script>
import SpaceReservations from "../views/SpaceReservations.vue";
import Calendar from "../views/Calendar.vue";

export default {
  props: ["space"],
  components: {
    SpaceReservations,
    Calendar,
  },
  async created() {
    console.log(this.space);
    this.$store.commit("setTitle", "Espaço");
  },
};
</script>