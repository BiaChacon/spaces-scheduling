<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters style="height: 150px">
        <v-col>
          <v-card class="pa-2" outlined tile>
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
                  label="Data"
                  outlined
                  hint="DD/MM/AAAA"
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
              v-model="checkSchedular"
              :items="schedular"
              item-text="label"
              item-value="value"
              chips
              label="Horário"
              multiple
              outlined
            ></v-select>
            <v-select
              v-model="checkComputers"
              :items="computers"
              item-text="label"
              item-value="value"
              label="Computadores"
              outlined
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
            ></v-select>

            <v-card-actions class="justify-center">
              <v-btn
                style="width: 120px"
                large
                rounded
                dark
                color="blue"
                @click.prevent="clear"
                >Limpar</v-btn
              >
              <v-btn
                style="width: 120px"
                large
                rounded
                dark
                color="orange"
                @click.prevent="check"
                >Checar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col>
          <v-card width="1400px" class="mx-auto">
            <template v-for="(space, index) in spaces">
              <v-card-title
                v-text="space.name"
                :key="space.id"
                class="mx-5"
                style="font-size: 2em; color: #0077c2"
              >
              </v-card-title>
              <v-card-text :key="space.id">
                <v-list :key="space.id">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="blue"> mdi-map-marker </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="space.localization">
                      </v-list-item-title>
                      <v-list-item-subtitle>Localização</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="blue"> mdi-account-group </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="space.qtdPeople"
                      ></v-list-item-title>
                      <v-list-item-subtitle>Capacidade</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="blue"> mdi-laptop </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="space.computers ? 'SIM' : 'NÃO'"
                      ></v-list-item-title>
                      <v-list-item-subtitle>Computadores</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions :key="space.id">
                <v-row justify="space-around">
                  <v-btn
                    @click="sendToDetail('detail-space', space)"
                    rounded
                    small
                    dark
                    color="blue"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    Detalhes
                  </v-btn>
                </v-row>
              </v-card-actions>
              <v-divider v-if="index < spaces.length - 1" :key="index">
              </v-divider>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";
const api = new ApiService("check-availability");

export default {
  data: () => ({
    spaces: [],
    date: new Date().toISOString().substr(0, 10),
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
    computers: [
      { label: "Sim", value: "1" },
      { label: "Não", value: "0" },
    ],
    checkComputers: "",
    checkSchedular: "",
    menu1: false,
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  created() {
    this.$store.commit("setTitle", "Ver disponibilidade");
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async detailSpace(id) {
      this.$router.push("detail-space", id);
    },
    navegateTo(where) {
      this.$router.push({ name: where });
    },
    sendToDetail(where, data) {
      this.$router.push({ name: where, params: { space: data } });
    },
    clear() {
      this.date = "";
      this.checkComputers = "";
      this.checkSchedular = "";
      this.spaces = [];
    },
    async check() {
      let hours = "";
      this.checkSchedular.sort();
      this.checkSchedular.map((state) => {
        hours += `${state},`;
      });
      hours = hours.substring(0, hours.length - 1);
      
      const params = new URLSearchParams({
        computers: this.checkComputers,
        date: this.date,
        hours: hours,
      }).toString();
      
      const response = await api.getListWithParams(params);

      this.spaces = [];
      this.spaces = response.data;
      if(this.spaces.length === 0){
        alert("nao possui espaços disponiveis nestas condições")
      }
    },
  },
};
</script>

<style lang="stylus" scoped></style>