<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="720" width="1080">
      <!-- <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/cadastrar-espaco">Cadastrar Espaço</router-link> |
        <router-link to="/listar-espacos">Listar Espaços</router-link>
      </div>
      <router-view/> -->
      <v-system-bar color="darken-3"></v-system-bar>

      <v-app-bar color="accent-4" dark prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Salas</v-toolbar-title>

      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="darken-3--text text--accent-4"
          >
            <v-list-item :to="{path: '/'}">
              <v-list-item-title >
                home
              </v-list-item-title>
            </v-list-item>

            <v-list-item :to="{path: '/cadastrar-espaco'}">
              <v-list-item-title>
                Cadastrar Espaço
              </v-list-item-title>
            </v-list-item>

            <v-list-item :to="{path: '/listar-espacos'}">
              <v-list-item-title>
                 Listar Espaços
              </v-list-item-title>
            </v-list-item>

            <v-list-item :to="{path: '/listar-reservas'}">
              <v-list-item-title>
                 Listar Reservas
              </v-list-item-title>
            </v-list-item>

            <v-list-item :to="{path: '/cadastro-reserva'}">
              <v-list-item-title>
                 Reservar Sala
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-card-text>
        The navigation drawer will appear from the bottom on smaller size
        screens.
      </v-card-text> -->
      <router-view/>
    </v-card>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style>
li a{
  text-decoration: none;
}

</style>