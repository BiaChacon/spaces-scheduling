<template>
  <div>
    Nome: <strong>{{ space.name }}</strong> <br />
    descrição: <strong>{{ space.description }}</strong>
    <hr />
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