<template>
  <div>
    <!-- Nome: <strong>{{ space.name }}</strong> <br />
    descrição: <strong>{{ space.description }}</strong>
    <hr /> -->

    <v-container>
      <v-layout>
        <v-flex xs12 sm8>
          <v-card hover>
            <v-card-media
              src="https://raw.githubusercontent.com/ijklim/simon-game/gh-pages/assets/img/bg--game-pad.jpg"
              height="150px"
            >
            </v-card-media>

            <v-card-title>
              <h2>{{ space.name }}</h2>
            </v-card-title>
            <v-card-text
              ><h3>{{ space.description }}</h3></v-card-text
            >
            <v-card-text>
              <span v-if="space.special === 1"> Espaço Especial </span>
              <span v-else>Espaço Normal</span>
            </v-card-text>
            <v-card-text>
              <div v-if="space.computers === 1">
                <p>Tem Computadores</p>
                <strong>Quantidade de Computadores: </strong>
                <p>{{ space.qtdPeople }}</p>
              </div>
              <div v-else>Não tem computadores</div>
            </v-card-text>
            <v-card-text>
              <strong>Justificativa: </strong>
              <p>{{ space.justification }}</p>
            </v-card-text>
            <v-card-text>
              <strong>Bloco: </strong>
              <p>{{ space.localization }}</p>
            </v-card-text>
            <v-card-text>
              <strong>Responsavel: </strong>
              <p>{{ space.responsible }}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <SpaceReservations :space_id="space.id" />
  </div>
</template>
<script>
import SpaceReservations from "../views/SpaceReservations.vue";

export default {
  props: ["space"],
  // data: () => ({}),
  components: {
    SpaceReservations,
  },
  async created() {
    window.console.log(this.space);
  },
  methods: {},
};
</script>