<template>
  <div>
    Reservas do espaço :
    <strong>{{ space_id }} </strong>
    
  </div>
</template>

<script>
export default {
  props: ["space_id"],
  data: () => {
    // label1: "Componente de listagem de reservas de um espaço";
  },
};
</script>

<style>
</style>