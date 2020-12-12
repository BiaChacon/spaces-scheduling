<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-text>
      <v-form class="m-3" style="margin: 30px" v-model="isValid">
        <v-text-field
          v-model="space.name"
          label="Nome"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="space.description"
          label="Descrição"
          :rules="[(v) => !!v || 'is required']"
          required
          auto-grow
          outlined
          rows="3"
          row-height="25"
        ></v-textarea>

        <v-text-field
          v-model="space.localization"
          label="Localização"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="space.responsible"
          label="Responsável"
          :rules="[(v) => !!v || 'is required']"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="space.special"
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
          v-model="space.justification"
          label="Justificativa"
          :rules="[(v) => !!v || 'is required']"
          required
          auto-grow
          outlined
          rows="3"
          row-height="25"
        ></v-textarea>

        <v-select
          v-model="space.computers"
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
          v-model="space.qtdPeople"
          label="Capacidade"
          required
          type="number"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="space.extension"
          label="Ramal"
          :rules="[(v) => !!v || 'is required']"
          required
          type="number"
          outlined
        ></v-text-field>
      </v-form>
      <v-card-actions class="justify-center">
        <v-btn
          :disabled="!isValid"
          style="width: 250px"
          large
          rounded
          dark
          color="blue"
          @click.prevent="submit"
          >
            <v-icon left> mdi-pencil </v-icon>
            Editar
          </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import ApiService from '../services/ApiService';
const api = new ApiService('spaces');

export default {
  data: () => ({
      options: [
        { label: "Sim", value: "true" },
        { label: "Não", value: "false" },
      ],
      options2: [
        { label: "Sim", value: "true" },
        { label: "Não", value: "false" },
      ],
      isValid: true,
      space: {},
  }),
  created() {
    this.space = this.$route.params.space;
    console.log(this.space);

    if(this.space.special)
      this.space.special="true"
    else
      this.space.special="false"

    if(this.space.computers)
      this.space.computers="true"
    else
      this.space.computers="false"

    this.space.disabled="false"

    this.$store.commit("setTitle", "Editar Espaço");
  },
  methods: {
    async submit(evt) {
        evt.preventDefault();
        let data = this.space;
        let id = this.space.id;
        delete data.id;
        api.update(data,id);
        this.$router.push("/");
        this.$alert("Espaço Editado.", "Sucesso", 'success');
        
    },
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