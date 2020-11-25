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
                @click="selectedOpen = false"
                color="blue"
              >
                <v-icon left> mdi-plus </v-icon>
                Detalhes
              </v-btn>
              <v-btn
                dark
                @click="selectedOpen = false"
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
import axiosConf from "../services/config";

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
      { start: "07:00:00", end:"07:50:00"},
      { start: "07:50:00", end:"08:40:00"},
      { start: "08:55:00", end:"09:45:00"},
      { start: "09:45:00", end:"10:35:00"},
      { start: "10:50:00", end:"11:40:00"},
      { start: "11:40:00", end:"12:30:00"},
      { start: "13:00:00", end:"13:50:00"},
      { start: "13:50:00", end:"15:40:00"},
      { start: "14:55:00", end:"15:45:00"},
      { start: "16:50:00", end:"17:40:00" },
      { start: "17:40:00", end:"18:30:00" },
    ],
    dayWeek: [
      { label: "Domingo", value: "6" },
      { label: "Segunda", value: "0" },
      { label: "Terça", value: "1" },
      { label: "Quarta", value: "2" },
      { label: "Quinta", value: "3" },
      { label: "Sexta", value: "4" },
      { label: "Sabádo", value: "5" },
    ],
  }),
  async created() {
    const result = await axiosConf.get("space-reservations", {
      params: { spaceId: this.space_id },
    });
    this.spacesReserves = result.data;
    let eventos = [];
    this.spacesReserves.forEach((res) => {
      let schedularStart = '', schedularEnd = '';
      const schedular = res.schedule.split(";");
      const hours = schedular[1].split(",");

      let tam = hours.length;
      if(tam > 1) {
        schedularStart = this.schedular[(hours[0])-1].start;
        schedularEnd = this.schedular[(hours[tam-1])-1].end;
      }else{
        schedularStart = this.schedular[hours[0]].start;
        schedularEnd = this.schedular[hours[0]].end;
      }

      const inicio = new Date(`${res.dateStart}T${schedularStart}`);
      const fim = new Date(`${res.dateEnd}T${schedularEnd}`);

      eventos.push({
        name: res.justification,
        start: inicio,
        end: fim,
        color: res.normal ? this.colors[0] : this.colors[1],
        timed: true,
        id: res.id,
      });
    });
    this.events = eventos;
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
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