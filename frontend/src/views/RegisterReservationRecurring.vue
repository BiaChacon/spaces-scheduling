<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-text>
      <v-form class="m-3" style="margin: 30px" v-model="isValid">
        <v-select
          v-model="selected"
          :items="selectLabels"
          label="Espaços"
          :rules="[v => !!v || 'is required']"
          required
          outlined
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>

        <v-textarea
            label="Reserva para..."
            auto-grow
            outlined
            rows="3"
            row-height="25"
            v-model="justification"
            :rules="[v => !!v || 'is required']"
            required
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
              v-mask="'##/##/####'"
              v-model="computedDateFormatted1"
              :rules="[v => !!v || 'is required']"
              required
              label="Data Inicio"
              outlined
              hint="DD/MM/AAAA"
              v-on="on"
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
              v-mask="'##/##/####'"
              v-model="computedDateFormatted2"
              :rules="[v => !!v || 'is required']"
              required
              label="Data Inicio"
              outlined
              hint="DD/MM/AAAA"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateEnd"
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>

        <v-select
          v-model="checkStateDayWeek"
          :items="dayWeek"
          item-text="label"
          item-value="value"
          required
          :rules="[(v) => !!v || 'is required']"
          chips
          label="Dia da Semana"
          multiple
          outlined
      ></v-select>

        <v-select
          v-model="checkState"
          :items="schedular"
          item-text="label"
          item-value="value"
          required
          :rules="[(v) => !!v || 'is required']"
          chips
          label="Horário"
          multiple
          outlined
        ></v-select>

      </v-form>
      <v-card-actions class="justify-center">
        <v-btn :disabled="!isValid" style="width: 250px" large rounded dark color="success" @click.prevent="submit">Cadastrar</v-btn>
      </v-card-actions>
    </v-card-text>
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
      {'label' : "Domingo", 'value' : "6"},
      {'label' : "Segunda", 'value' : "0"},
      {'label' : "Terça", 'value' : "1"},
      {'label' : "Quarta", 'value' : "2"},
      {'label' : "Quinta", 'value' : "3"},
      {'label' : "Sexta", 'value' : "4"},
      {'label' : "Sabádo", 'value' : "5"},
    ],
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
    checkState: '',
    checkStateDayWeek: '',
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
    isValid: true,
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

      this.checkState.sort();
      this.checkState.map((state) => {
        hour += (`${state},`);
      });

      this.checkStateDayWeek.sort();
      this.checkStateDayWeek.map((state) => {
        dayWeek += (`${state},`);
      });


      hour = hour.substring(0, hour.length - 1);
      dayWeek = dayWeek.substring(0, dayWeek.length - 1);

      this.horario = `${dayWeek};${hour}`;
      console.log(this.horario);

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
      this.checkStateDayWeek = "";
      this.checkState = "";
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