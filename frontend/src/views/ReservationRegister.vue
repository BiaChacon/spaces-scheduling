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
            v-model="dateFormatted"
            label="Data"
            hint="DD/MM/AAAA"
            persistent-hint
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
            class="m-2"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>
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


      <v-checkbox
        v-model="h2"
        :label="schedular[10]"
        value="Jacob"
      ></v-checkbox>
      <v-btn class="m-2" @click.prevent="submit">Salvar</v-btn>
      <v-btn class="m-2" @click.prevent="clear">Limpar Campos</v-btn>
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
    submit() {
      this.newReserve = {
        normal: true,
        dateStart: this.date,
        dateEnd: this.date,
        justification: this.justification,
        schedule: "1;1,2,3",
        canceled: false,
        spaceId: this.selectIds[this.selectLabels.indexOf(this.selected)],
      };
      let hour = "";
      window.console.log(this.newReserve);
      /** scrolls through the list of checkboxes and generates a string 
       * concatenating the index of all those that are marked + 1 **/
      this.checkState.map((state,index) => {
        state === true ? hour += `${index+1},` : hour += "";
      }) 
      window.console.log(hour); 
      let x = new Date(this.date);
      window.console.log(x.getDay());
    },
    clear() {
      this.justification = "";
      this.checkState[0] = false;
      this.date = "";
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