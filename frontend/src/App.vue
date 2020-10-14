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
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
        <!-- <router-link to="/cadastrar-espaco">Cadastrar Espaço</router-link> |
        -->
              <v-list-item-title >
                <router-link to="/">Home</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <router-link to="/cadastrar-espaco">Cadastrar Espaço</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                 <router-link to="/listar-espacos">Listar Espaços</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-top: 100px;
  padding-bottom: 20px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

</style>