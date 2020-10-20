<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title>Reserve uma sala</v-card-title>
    <v-form class="m-3" style="margin: 30px">
      <v-select
        class="m-2"
        v-model="spaces"
        :items="items"
        :error-messages="selectErrors"
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
            hint="12/02/2006"
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
      <v-checkbox v-model="h1" :label="schedular[0]" value="John"></v-checkbox>
      <v-checkbox v-model="h2" :label="schedular[2]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h3" :label="schedular[3]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h5" :label="schedular[4]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h2" :label="schedular[5]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h2" :label="schedular[6]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h2" :label="schedular[7]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h2" :label="schedular[8]" value="Jacob"></v-checkbox>
      <v-checkbox v-model="h2" :label="schedular[9]" value="Jacob"></v-checkbox>
      <v-checkbox
        v-model="h2"
        :label="schedular[10]"
        value="Jacob"
      ></v-checkbox>
    </v-form>
  </v-card>
</template>
<style scoped>
</style>
<script>
import ApiService from "../services/ApiService";
const http = new ApiService('spaces');

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
    spaces: []
  }),
  async created() {
    window.console.log("reservation page created");
    let response = await http.getList();
    this.spaces = response.data;
    window.console.log(response.data);
  },
};
</script>