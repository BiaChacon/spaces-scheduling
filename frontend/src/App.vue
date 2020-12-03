<template>
  <div v-if="!showMenu">
    <v-app style="background-color: #d9e2eb">
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

export default {
  name: "App",
  components: {
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
    showMenu() {
      return this.$route.name !== "login";
    }
  },
};
</script>

<style></style>