<template>
  <div>
    <div v-if="spacesReserves.length !== 0">
      <h3
        class="pl-1 pt-8"
        style="color: #0077c2; font-weight: bold; font-size: 30px"
      >
        Lista de Reservas do Espaço:
      </h3>
    </div>

    <div class="black--text pl-0 pt-3">
      <v-card width="1400px" class="mx-auto">
        <div v-if="spacesReserves.length == 0">
          <v-card-title
            disabled="true"
            class="pl-11"
            style="color: grey; font-weight: bold; font-size: 20px"
            v-text="
              spacesReserves.length == 0
              ? 'Espaço não possuí reservas'
              : '' "
          >
          </v-card-title>
        </div>

        <template v-for="(reserve, index) in spacesReserves">
          <v-card-text :key="reserve.id">
            <v-list :key="reserve.id" disabled="true">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    style="color:#0077c2; font-weight: bold; font-size: 20px"
                    v-text="reserve.justification">
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <div v-if="reserve.normal">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="blue"> mdi-calendar </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title> {{formatDate(reserve.dateStart)}} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-else>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="blue"> mdi-calendar </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="justify-center">
                    <v-list-item-title>
                      Inicio: {{formatDate(reserve.dateStart)}}
                    </v-list-item-title>
                    <v-list-item-title>
                      Fim: {{formatDate(reserve.dateEnd)}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-if="reserve.normal">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="blue"> mdi-clock-outline </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title> {{ formatSchedular(reserve.schedule) }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-else>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="blue"> mdi-calendar-clock </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title> {{ formatDayWeek(reserve.schedule) }} </v-list-item-title>
                    <v-list-item-title> {{ formatSchedular(reserve.schedule) }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-card-text>

          <v-card-actions :key="reserve.id">
            <v-row align="center" justify="center">
              <v-btn
                @click="sendToDetail('detail-reserve',reserve)"
                :key="reserve.id"
                outlined
                rounded
                text
                dark
                color="blue"
              >
              <v-icon left>
                mdi-plus
              </v-icon>
                Detalhes
              </v-btn>
            </v-row>
          </v-card-actions>

          <v-divider v-if="index < spacesReserves.length - 1" :key="index">
          </v-divider>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import axiosConf from "../services/config";

export default {
  props: ["space_id"],
  data: () => ({
    spacesReserves: [],
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
    const result = await axiosConf.get("space-reservations", {
      params: { spaceId: this.space_id },
    });
    this.spacesReserves = result.data;
  },
  methods: {
    async detailReserve(id) {
      this.$router.push("detail-reserve", id);
    },
    navegateTo(where) {
      this.$router.push({ name: where });
    },
    sendToDetail(where, data) {
      this.$router.push({ name: where, params: { reserve: data } });
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

<style>
</style>