<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title>Reserve uma sala</v-card-title>
    <v-form class="m-3" style="margin: 30px">
      <v-select
        class="m-2"
        v-model="selected"
        :items="selectLabels"
        label="Espaços"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-textarea
        label="Justificativa"
        auto-grow
        outlined
        rows="3"
        row-height="25"
        shaped
        v-model="justification"
      ></v-textarea>

      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedDateFormatted1"
            label="Data Inicio"
            hint="DD/MM/AAAA"
            persistent-hint
            v-on="on"
            class="m-2"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateStart"
          no-title
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedDateFormatted2"
            label="Data Fim"
            hint="DD/MM/AAAA"
            persistent-hint
            v-on="on"
            class="m-2"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateEnd"
          no-title
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>

      <p class="text-left">Selecione o dia da semana:</p>
      <v-checkbox v-model="checkStateDayWeek[6]" :label="dayWeek[0]"></v-checkbox>
      <v-checkbox v-model="checkStateDayWeek[0]" :label="dayWeek[1]"></v-checkbox>
      <v-checkbox v-model="checkStateDayWeek[1]" :label="dayWeek[2]"></v-checkbox>
      <v-checkbox v-model="checkStateDayWeek[2]" :label="dayWeek[3]"></v-checkbox>
      <v-checkbox v-model="checkStateDayWeek[3]" :label="dayWeek[4]"></v-checkbox>
      <v-checkbox v-model="checkStateDayWeek[4]" :label="dayWeek[5]"></v-checkbox>
      <v-checkbox v-model="checkStateDayWeek[5]" :label="dayWeek[6]"></v-checkbox>

      <p class="text-left">Selecione o horario:</p>
      <v-checkbox v-model="checkState[0]" :label="schedular[0]"></v-checkbox>
      <v-checkbox v-model="checkState[1]" :label="schedular[1]"></v-checkbox>
      <v-checkbox v-model="checkState[2]" :label="schedular[2]"></v-checkbox>
      <v-checkbox v-model="checkState[3]" :label="schedular[3]"></v-checkbox>
      <v-checkbox v-model="checkState[4]" :label="schedular[4]"></v-checkbox>
      <v-checkbox v-model="checkState[5]" :label="schedular[5]"></v-checkbox>
      <v-checkbox v-model="checkState[6]" :label="schedular[6]"></v-checkbox>
      <v-checkbox v-model="checkState[7]" :label="schedular[7]"></v-checkbox>
      <v-checkbox v-model="checkState[8]" :label="schedular[8]"></v-checkbox>
      <v-checkbox v-model="checkState[9]" :label="schedular[9]"></v-checkbox>

      <v-btn class="m-2" @click.prevent="submit">Salvar</v-btn>
    </v-form>
  </v-card>
</template>
<style scoped>
</style>
<script>
import ApiService from "../services/ApiService";
const http = new ApiService("spaces");

export default {
  data: () => ({
    dayWeek: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabádo",
    ],
    schedular: [
      "07:00-07:50",
      "07:50-08:40",
      "08:55-09:45",
      "09:45-10:35",
      "10:50-11:40",
      "11:40-12:30",
      "13:00-13:50",
      "13:50-15:40",
      "14:55-15:45",
      "16:50-17:40",
      "17:40-18:30",
    ],
    checkStateDayWeek: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    checkState: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    spaces: [],
    menu2: false,
    menu1: false,
    number: "",
    justification: "",
    selected: null,
    dateStart: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    selectLabels: [],
    selectIds: [],
    newReserve: {},
    horario: "",
  }),
  computed: {
    computedDateFormatted1() {
      return this.formatDate(this.dateStart);
    },
    computedDateFormatted2() {
      return this.formatDate(this.dateEnd);
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required && errors.push("Numero é obrigatorio");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Tipo de serviço é obrigatorio");
      return errors;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async submit() {
      const api = new ApiService("register-reservation");
      let hour = "";
      let dayWeek = "";
      
      /** scrolls through the list of checkboxes and generates a string
       * concatenating the index of all those that are marked + 1 **/
      this.checkState.map((state, index) => {
        state === true ? (hour += `${index + 1},`) : (hour += "");
      });

      this.checkStateDayWeek.map((state, index) => {
        state === true ? (dayWeek += `${index},`) : (dayWeek += "");
      });


      hour = hour.substring(0, hour.length - 1);
      dayWeek = dayWeek.substring(0, dayWeek.length - 1);

      this.horario = `${dayWeek};${hour}`;

      this.newReserve = {
        normal: false,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        justification: this.justification,
        schedule: this.horario,
        canceled: false,
        spaceId: this.selectIds[this.selectLabels.indexOf(this.selected)],
      };

      console.log(this.newReserve);

      await api.create(this.newReserve);
      alert('Reserva cadastrada com sucesso!');
      this.clear();
       this.$router.push("/");
    },
    clear() {
      this.justification = "";
      this.checkStateDayWeek = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]
      this.checkState = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      this.dateStart = "";
      this.dateEnd = "";
      this.selected = "";
    },
  },
  async created() {
    window.console.log("reservation page created");
    let response = await http.getList();
    this.spaces = response.data;
    window.console.log(response.data);
    this.spaces.map((item) => {
      this.selectLabels.push(item.name);
      this.selectIds.push(item.id);
    });
  },
};
</script>