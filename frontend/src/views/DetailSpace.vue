<template>
  <div>
    <h1>{{ space.name }}</h1>

    <p>{{ space.description }}</p>

    <p v-text=' space.special ? "Espaço Especial" : "Espaço Normal" '></p>

    <p v-text=' space.computers ? "Tem Computadores" : "Não tem computadores" '></p>

    <strong>Capacidade: </strong>
    <p>{{ space.qtdPeople }}</p>

    <strong>Justificativa: </strong>
    <p>{{ space.justification }}</p>

    <strong>Bloco: </strong>
    <p>{{ space.localization }}</p>

    <strong>Responsavel: </strong>
    <p>{{ space.responsible }}</p>

    <v-btn
      tile
      dark
      color="blue"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Editar
    </v-btn>

    <SpaceReservations :space_id="space.id" />
  </div>
</template>
<script>
import SpaceReservations from "../views/SpaceReservations.vue";

export default {
  props: ["space"],
  components: {
    SpaceReservations,
  },
  async created() {
    console.log(this.space);
  },
  methods: {},
};
</script>