<template>
  <div>
    <h3>{{reserve.justification}}</h3>
    <p></p>
    <strong>Local: </strong>
    <p>{{nameSpace(reserve.spaceId)}}</p>

    <div v-if="reserve.normal">
      <strong>Data da reserva: </strong>
      <p>{{ reserve.dateStart }}</p>
    </div>
    <div v-else>
      <strong>Data Inicio: </strong>
      <p>{{ reserve.dateStart }}</p>
      <strong>Data Fim: </strong>
      <p>{{ reserve.dateEnd }}</p>
    </div>

    <strong>Horário:</strong>
    <p>{{ reserve.schedule }}</p>

    <b-button>Editar</b-button>
    <p></p>
    <b-button>Cancelar</b-button>
  </div>
</template>
<script>
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');

export default {
  props: ["reserve"],
  async created() {},
  methods: {
    async nameSpace(id) {
      let response = await http.getOne(id);
      let space = response.data;
      const name = space[0].name
      console.log(name);
      return name;
    }
  },
};
</script>