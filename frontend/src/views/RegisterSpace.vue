<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-text>
      <v-form class="m-3" style="margin: 30px" v-model="isValid">
        <v-text-field
          v-model="form.name"
          label="Nome"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="form.description"
          label="Descrição"
          :rules="[(v) => !!v || 'is required']"
          required
          auto-grow
          outlined
          rows="3"
          row-height="25"
        ></v-textarea>

        <v-text-field
          v-model="form.localization"
          label="Localização"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="form.responsible"
          label="Responsável"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="form.special"
          :items="options"
          item-text="label"
          item-value="value"
          label="Espaço especial"
          required
          outlined
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>

        <v-textarea
          v-model="form.justification"
          label="Justificativa"
          :rules="[(v) => !!v || 'is required']"
          required
          auto-grow
          outlined
          rows="3"
          row-height="25"
        ></v-textarea>

        <v-select
          v-model="form.computers"
          :items="options2"
          item-text="label"
          item-value="value"
          label="Computadores"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>

        <v-text-field
          v-model="form.qtdPeople"
          label="Capacidade"
          required
          type="number"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="form.extension"
          label="Ramal"
          :rules="[(v) => !!v || 'is required']"
          required
          type="number"
          outlined
        ></v-text-field>
      </v-form>
      <v-card-actions class="justify-center">
        <v-btn
          style="width: 250px"
          large
          rounded
          dark
          color="success"
          @click.prevent="submit"
          >Cadastrar</v-btn
        >
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import ApiService from "../services/ApiService";
const http = new ApiService("spaces");

export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        localization: "",
        responsible: "",
        special: null,
        justification: "",
        disabled: false,
        computers: null,
        qtdPeople: "",
        extension: "",
      },
      options: [
        { label: "Sim", value: "true" },
        { label: "Não", value: "false" },
      ],
      options2: [
        { label: "Sim", value: "true" },
        { label: "Não", value: "false" },
      ],
      show: true,
      isValid: true,
    };
  },
  methods: {
    async submit(evt) {
      if (
        this.form.name === "" &&
        this.form.description === "" &&
        this.form.localization === "" &&
        this.form.responsible === "" &&
        this.form.special === null &&
        this.form.justification === "" &&
        this.form.disabled === false &&
        this.form.computers === null &&
        this.form.qtdPeople === "" &&
        this.form.extension === ""
      ) {
        alert("Todos os campos devems ser preenchidos");
      } else {
        evt.preventDefault();
        http.create(this.form);
        alert("Espaço salvo");
        this.$router.push("/");
      }
    },
    onReset(evt) {
      evt.preventDefault();
      (this.form.name = ""),
        (this.form.description = ""),
        (this.form.localization = ""),
        (this.form.responsible = ""),
        (this.form.special = null),
        (this.form.justification = ""),
        (this.form.disabled = false),
        (this.form.computers = null),
        (this.form.qtdPeople = ""),
        (this.form.extension = ""),
        (this.show = false);
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  created() {
    this.$store.commit("setTitle", "Cadastro de Espaço");
  },
};
</script>

<style scoped>
#formSpace {
  width: 400px;
  margin: auto;
}
#btnRegister {
  margin-right: 11em;
}
</style>