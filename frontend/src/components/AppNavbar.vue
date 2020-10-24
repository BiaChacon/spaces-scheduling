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
      <v-toolbar-title dark class="text-center">Spaces Scheduling</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <!-- <v-icon>exit_to_app</v-icon> -->
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer 
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      color="#0091EA" 
      dark
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
        <v-list-item v-for="item in items" :key="item.title" @click="navegateTo(item.to)">
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
        { title: "Home", icon: "mdi-home", to: "home" },
        { title: "Ver disponibilidade", icon: "mdi-home", to: "check-availability" },
        { title: "Cadastrar Espaço", icon: "mdi-home", to: "register-space" },
        { title: "Cadastrar Reservar Normal", icon: "mdi-home", to: "register-reservation-normal" },
        { title: "Cadastrar Reservar Recorrente", icon: "mdi-home", to: "register-reservation-recurring" },
      ]
    };
  },
  methods: {
    navegateTo(where) {
        this.$router.push({name : where});   
    }
  }
};
</script>