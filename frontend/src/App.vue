<template>
  <v-app>
    <app-navbar></app-navbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavbar";
import Footer from './components/Footer';

export default {
  name: "App",
  components: {
    Footer,
    AppNavbar,
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

<style></style>