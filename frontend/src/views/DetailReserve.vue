<template>
  <div style="margin: 20px">
    <v-card
      elevation="2"
      shaped
      color="#fff"
      style="margin-bottom: 50px"
    >

      <v-card-title
        disabled="true"
        class="mx-5" 
        style="font-size:2em; color:#0077c2"
      >
        {{reserve.justification}}
      </v-card-title>

      <v-card-text>
        <v-list color="#fff" disabled="true">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue">
                mdi-home-city-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
              >
              {{nameSpace()}}
              </v-list-item-title>
              <v-list-item-subtitle>Espaço</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <div v-if="reserve.normal">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue">
                  mdi-calendar-today
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{formatDate(reserve.dateStart)}}
                </v-list-item-title>
                <v-list-item-subtitle>Data da reserva</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>

          <div v-else>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue">
                  mdi-calendar-today
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{formatDate(reserve.dateStart)}}
                </v-list-item-title>
                <v-list-item-subtitle>Data de Inicio</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue">
                  mdi-calendar-remove
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{formatDate(reserve.dateEnd)}}
                </v-list-item-title>
                <v-list-item-subtitle>Data de Fim</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue">
                  mdi-calendar-week
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ formatDayWeek(reserve.schedule) }}
                </v-list-item-title>
                <v-list-item-subtitle>Dia da semana</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="blue">
                mdi-clock-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ formatSchedular(reserve.schedule) }}
              </v-list-item-title>
              <v-list-item-subtitle>Horário</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-row
          align="center"
          justify="center"
        >
          <v-btn
            rounded
            small
            @click.prevent="cancel"
            color="error"
          >
            <v-icon left>
              mdi-cancel 
            </v-icon>
              Cancelar
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
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
    schedular: [
      {'label' : "07:00-07:50", 'value' : "1"},
      {'label' : "07:50-08:40", 'value' : "2"},
      {'label' : "08:55-09:45", 'value' : "3"},
      {'label' : "09:45-10:35", 'value' : "4"},
      {'label' : "10:50-11:40", 'value' : "5"},
      {'label' : "11:40-12:30", 'value' : "6"},
      {'label' : "13:00-13:50", 'value' : "7"},
      {'label' : "13:50-15:40", 'value' : "8"},
      {'label' : "14:55-15:45", 'value' : "9"},
      {'label' : "16:50-17:40", 'value' : "10"},
      {'label' : "17:40-18:30", 'value' : "11"},
    ],
    dayWeek: [
      {'label' : "Domingo", 'value' : "6"},
      {'label' : "Segunda", 'value' : "0"},
      {'label' : "Terça", 'value' : "1"},
      {'label' : "Quarta", 'value' : "2"},
      {'label' : "Quinta", 'value' : "3"},
      {'label' : "Sexta", 'value' : "4"},
      {'label' : "Sabádo", 'value' : "5"},
    ],
  }),
  async created() {
    const result = await http.getOne(this.reserve.spaceId);
    this.space = result.data;
    this.$store.commit("setTitle", "Detalhes da Reserva");
    
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
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    formatDayWeek(schedular) {
      const days = schedular.split(";");
      const d = days[0].split(",");
      let dayFormated = "";

      for(let i=0; i<d.length; i++) {
        dayFormated += (`${this.dayWeek[i].label}`);
        if(i+1 < d.length)
        dayFormated += (' | ');
      }

      return `${dayFormated}`;
    },
    formatSchedular(schedular) {
      const hours = schedular.split(";");
      const h = hours[1].split(",");
      let scheduleFormated = "";

      for(let i=0; i<h.length; i++) {
        scheduleFormated += (`${this.schedular[i].label}`);
        if(i+1 < h.length)
        scheduleFormated += (' | ');
      }

      return `${scheduleFormated}`;
    },
  },
};
</script>