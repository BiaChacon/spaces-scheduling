<template>
  <div v-if="!showLogin">
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
  created: function () {
    // this.$http.interceptors.response.use(undefined, function (err) {
    //   return new Promise(function () {
    //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //       this.$store.dispatch("logout");
    //     }
    //     throw err;
    //   });
    // });
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
    showLogin() {
      return this.$route.name !== "login";
    },
    isLoggedIn: function () {
      
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style></style>