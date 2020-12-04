<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoje
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mês</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            </v-toolbar>
            <v-card-actions class="justify-center">
              <v-btn
                dark
                rounded
                small
                @click="sendToDetail('detail-reserve', selectedEvent.id)"
                color="blue"
              >
                <v-icon left> mdi-plus </v-icon>
                Detalhes
              </v-btn>
              <v-btn
                dark
                @click="cancel(selectedEvent.id)"
                rounded
                small
                color="error"
              >
                <v-icon left> mdi-cancel </v-icon>
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import ApiService from "../services/ApiService";
const api = new ApiService("space-reservations");
import { RRule } from "rrule";

export default {
  props: ["space_id"],
  data: () => ({
    spacesReserves: [],
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mês",
      week: "Semana",
      day: "Dia",
      "4day": "4 Dias",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ["orange", "blue"],
    schedular: [
      { start: "07:00:00", end: "07:50:00", hour: "7", min: "50" },
      { start: "07:50:00", end: "08:40:00", hour: "8", min: "40" },
      { start: "08:55:00", end: "09:45:00", hour: "9", min: "45" },
      { start: "09:45:00", end: "10:35:00", hour: "10", min: "35" },
      { start: "10:50:00", end: "11:40:00", hour: "11", min: "40" },
      { start: "11:40:00", end: "12:30:00", hour: "12", min: "30" },
      { start: "13:00:00", end: "13:50:00", hour: "13", min: "50" },
      { start: "13:50:00", end: "15:40:00", hour: "15", min: "40" },
      { start: "14:55:00", end: "15:45:00", hour: "15", min: "45" },
      { start: "16:50:00", end: "17:40:00", hour: "17", min: "40" },
      { start: "17:40:00", end: "18:30:00", hour: "18", min: "30" },
    ],
    dayWeek: [
      RRule.MO,
      RRule.TU,
      RRule.WE,
      RRule.TH,
      RRule.FR,
      RRule.SA,
      RRule.SU,
    ],
  }),
  async created() {
    const params = new URLSearchParams({
      spaceId: this.space_id,
    }).toString();

    const result = await api.getListWithParams(params);
    this.spacesReserves = result.data;

    let eventos = [];
    this.spacesReserves.forEach((res) => {
      let schedularStart = "",
        schedularEnd = "";
      const schedular = res.schedule.split(";");
      const hours = schedular[1].split(",");
      let min = 0;
      let hour = 0;
      let tam = hours.length;
      if (tam > 1) {
        schedularStart = this.schedular[hours[0] - 1].start;
        schedularEnd = this.schedular[hours[tam - 1] - 1].end;
        min = this.schedular[hours[tam - 1] - 1].min;
        hour = this.schedular[hours[tam - 1] - 1].hour;
      } else {
        schedularStart = this.schedular[hours[0]].start;
        schedularEnd = this.schedular[hours[0]].end;
        min = this.schedular[hours[0]].min;
        hour = this.schedular[hours[0]].hour;
      }

      const inicio = new Date(`${res.dateStart}T${schedularStart}`);
      const fim = new Date(`${res.dateEnd}T${schedularEnd}`);
      console.log(res.id);
      if (res.normal) {
        eventos.push({
          name: res.justification,
          start: inicio,
          end: fim,
          color: res.normal ? this.colors[0] : this.colors[1],
          timed: true,
          id: res.id,
        });
      } else {
        let day = schedular[0].split(",");
        let wd = [];
        for (let i = 0; i < day.length; i++) {
          wd.push(this.dayWeek[day[i]]);
        }

        let reservations = [];
        let rule = new RRule({
          freq: RRule.WEEKLY,
          dtstart: inicio,
          until: fim,
          interval: 1,
          byweekday: wd,
        });
        reservations = rule.all();

        reservations.forEach((r) => {
          let hourEnd = new Date(r);
          hourEnd.setMinutes(min);
          hourEnd.setHours(hour);

          eventos.push({
            name: res.justification,
            start: r,
            end: hourEnd,
            color: res.normal ? this.colors[0] : this.colors[1],
            timed: true,
            id: res.id,
          });
        });
      }
    });
    console.log(eventos);
    this.events = eventos;
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    cancel(id) {
      this.$confirm(
        "Deseja cancelar reserva?",
        "Cancelar Reserva",
        "question",
        {
          confirmButtonText: "Sim",
          confirmButtonColor: "#4CAF50",
          cancelButtonText: "Não",
          cancelButtonColor: "#FF5252",
        }
      ).then((result) => {
        if (result) {
          this.cancelar(id);
          this.$alert("Reserva cancelada.", "Sucesso", "success");
        }
      });
    },
    async cancelar(id) {
      const api2 = new ApiService("reservation-cancel");
      let reservation = {};
      this.events.forEach((e) => {
        if (e.id == id) {
          reservation = e;
        }
      });
      await api2.cancel(reservation, id);
      this.$router.push("/");
    },
    sendToDetail(where, id) {
      let data = {};
      this.spacesReserves.forEach((item) => {
        if (item.id == id) {
          data = item;
        }
      });
      console.log(data);
      this.$router.push({ name: where, params: { reserve: data } });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>