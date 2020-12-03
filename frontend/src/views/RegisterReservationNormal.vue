<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-text>
      <v-form class="m-3" style="margin: 30px" v-model="isValid">
        <v-select
          v-model="selected"
          :items="selectLabels"
          label="Espaços"
          :rules="[(v) => !!v || 'is required']"
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
          :rules="[(v) => !!v || 'is required']"
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
              v-model="dateFormatted"
              :rules="[(v) => !!v || 'is required']"
              required
              label="Data"
              outlined
              hint="DD/MM/AAAA"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>

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
        <v-btn
          :disabled="!isValid"
          style="width: 250px"
          large
          rounded
          dark
          color="success"
          @click.prevent="submit"
          >Cadastrar</v-btn
        >
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import ApiService from "../services/ApiService";
const http = new ApiService("spaces");

export default {
  data: () => ({
    schedular: [
      { label: "07:00-07:50", value: "1" },
      { label: "07:50-08:40", value: "2" },
      { label: "08:55-09:45", value: "3" },
      { label: "09:45-10:35", value: "4" },
      { label: "10:50-11:40", value: "5" },
      { label: "11:40-12:30", value: "6" },
      { label: "13:00-13:50", value: "7" },
      { label: "13:50-15:40", value: "8" },
      { label: "14:55-15:45", value: "9" },
      { label: "16:50-17:40", value: "10" },
      { label: "17:40-18:30", value: "11" },
    ],
    checkState: "",
    spaces: [],
    time: null,
    menu2: false,
    menu1: false,
    number: "",
    justification: "",
    selected: null,
    date: new Date().toISOString().substr(0, 10),
    // dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
    selectLabels: [],
    selectIds: [],
    newReserve: {},
    horario: "",
    isValid: true,
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
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
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
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

      this.checkState.sort();
      this.checkState.map((state) => {
        hour += `${state},`;
      });

      let day = new Date(this.date);

      hour = hour.substring(0, hour.length - 1);
      this.horario = `${day.getDay()};${hour}`;

      this.newReserve = {
        normal: true,
        dateStart: this.date,
        dateEnd: this.date,
        justification: this.justification,
        schedule: this.horario,
        canceled: false,
        spaceId: this.selectIds[this.selectLabels.indexOf(this.selected)],
      };

      await api.create(this.newReserve);
      alert("Reserva cadastrada com sucesso!");
      this.clear();
      this.$router.push("/");
    },
    clear() {
      this.justification = "";
      this.checkState = "";
      this.date = "";
      this.selected = "";
    },
  },
  async created() {
    let response = await http.getList();
    this.spaces = response.data;

    this.spaces.map((item) => {
      this.selectLabels.push(item.name);
      this.selectIds.push(item.id);
    });
    this.$store.commit("setTitle", "Cadastro de Reserva Normal");
  },
};
</script>

<style scoped>
</style>