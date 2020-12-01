<template>
  <div v-if="!showLogin">
    <v-app style="background-color: #D9E2EB;">
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      <!-- <Footer></Footer> -->
    </v-app>
  </div>
  <div v-else>
    <v-app>
      <app-navbar />
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      <!-- <Footer></Footer> -->
    </v-app>
  </div>

</template>

<script>
import AppNavbar from "./components/AppNavbar";
// import Footer from './components/Footer';

export default {
  name: "App",
  components: {
    // Footer,
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
  computed: {
    showLogin () {
      return this.$route.name !== 'login'
    }
  }
};
</script>

<style></style>