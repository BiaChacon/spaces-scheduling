<template>
  <v-row justify="center" class="text-center" style="margin-top: 200px">
    <v-col cols="12" sm="10" md="8" lg="5">
      <v-card ref="form" elevation="2" outlined>
        <v-card-title
          style="color: #0091ea; font-weight: bold; font-size: 20px"
        >
          AUTENTICAÇÃO INTEGRADA
        </v-card-title>

        <div v-if="!valid">
          <v-alert color="red" dense outlined> Credenciais inválidas. </v-alert>
        </div>

        <v-card-text>
          <v-text-field
            v-model="form.username"
            label="Usuário"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Senha"
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-row align="center" justify="center">
            <v-btn
              @click="login"
              rounded
              dark
              color="blue"
              style="width: 200px"
            >
              Entrar
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    valid: true,
    form: { username: "", password: "" },
  }),
  methods: {
    login: function () {
      // let data = this.form;
      this.$store
        .dispatch("login", this.form)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>