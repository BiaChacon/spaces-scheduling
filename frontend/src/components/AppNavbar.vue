<template>
  <div>
      <v-app-bar 
        app 
        clipped-rigth 
        flat 
        color="#0091EA" 
        dark
      >
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title dark class="text-center">{{$store.getters.titlePage}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <!-- <v-icon>exit_to_app</v-icon> -->
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer 
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      color="#0091EA" 
      dark
      width="270"
    >
      <v-list dense>
        <v-list-item>
          <!-- <v-list-item-avatar>
            <v-img src="../../public/favicon.ico"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title>
              <strong>Agendamento de Salas</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" @click="navegateTo(item.to, item.page)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title>
              <strong>{{ item.title }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Espaços", page:"Espaços", icon: "mdi-home-city-outline", to: "home" },
        { title: "Ver disponibilidade", page:"Ver disponibilidade", icon: "mdi-calendar-search ", to: "check-availability" },
        { title: "Cadastrar Reserva Normal", page:"Cadastro de Reserva Normal", icon: "mdi-calendar-plus", to: "register-reservation-normal" },
        { title: "Cadastrar Reserva Recorrente", page:"Cadastro de Reserva Recorrente", icon: "mdi-calendar-plus", to: "register-reservation-recurring" },
        { title: "Cadastrar Espaço", page:"Cadastro de Espaço", icon: "mdi-home-plus", to: "register-space" },
      ],
      namePage: "Espaços",
    };
  },
  methods: {
    navegateTo(where, name) {
      this.namePage = name;
      this.$router.push({name : where});
    }
  }
};
</script>