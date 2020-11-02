<template>
  <div>
    Reservas do espaço :
    <div v-if="space_id">
      <strong>{{ space_id }} </strong>
    </div>
    
    
  </div>
</template>

<script>
export default {
  props: ["space_id"],
  // data: () => {
  //   // label1: "Componente de listagem de reservas de um espaço"
  // },
  
};
</script>

<style>
</style>