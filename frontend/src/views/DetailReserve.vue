<template>
  <div>
    <h3>{{reserve.justification}}</h3>
    <p></p>
    <strong>Local: </strong>
    <p>{{nameSpace()}}</p>

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
    <!-- <v-btn
      tile
      dark
      color="blue"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Editar
    </v-btn> -->
    <v-btn
      @click.prevent="cancel"
      tile
      color="error"
    >
      <v-icon left>
        mdi-cancel 
      </v-icon>
      Cancelar
    </v-btn>
  </div>
</template>
<script>
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');
import axiosConf from "../services/config";

export default {
  props: ["reserve"],
  data: () => ({
    space: [],
  }),
  async created() {
    const result = await http.getOne(this.reserve.spaceId);
    this.space = result.data;
  },
  methods: {
    nameSpace() {
      return this.space[0].name;
    },
    async cancel(){
      var r = confirm("Cancelar reserva?");
      if (r == true) {
        await axiosConf.put(`/reservation-cancel/${this.reserve.id}`);
        this.$router.push('/');
      } else {
        console.log("continua aqui");
      }
    }
  },
};
</script>