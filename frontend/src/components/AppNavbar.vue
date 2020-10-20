<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped dark color="#343A40" width='180'>
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-img src="../../public/favicon.ico"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <strong>PoP Tickets</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" @click="navegateTo(item.to)">
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content >
            <v-list-item-title>
              <strong>{{ item.title }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="accent-4" dense dark clipped-left>
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title dark>PoP Tickets</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "house", to: "home" },
        { title: "Novo Espaço", icon: "report", to: "register-space" },
        { title: "Reservas", icon: "new_releases", to: "reservations" },
        { title: "Faça a sua reserva", icon: "next_week", to: "register-reservation" }
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