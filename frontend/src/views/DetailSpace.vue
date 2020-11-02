<template>
  <div>
    {{ space }}

    <SpaceReservations :space_id="space.id" />
  </div>
</template>
<script>

import SpaceReservations from "../views/SpaceReservations.vue";

export default {
  props: ["space"],
  data: () => ({}),
  components: {
    SpaceReservations,
  },
  async created() {},
  methods: {},
};
</script>