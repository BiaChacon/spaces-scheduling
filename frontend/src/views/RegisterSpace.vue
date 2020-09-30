<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="Nome" label-for="input-2">
        <b-form-input
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Descrição" label-for="input-2">
        <b-form-input
          v-model="form.description"
          required
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Localização" label-for="input-2">
        <b-form-input
          v-model="form.localization"
          required
          placeholder="Enter localization"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Responsável" label-for="input-2">
        <b-form-input
          v-model="form.responsible"
          required
          placeholder="Enter responsible"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Espaço especial:" label-for="input-3">
        <b-form-select
          v-model="form.special"
          :options="options"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Justificativa" label-for="input-2">
        <b-form-input
          v-model="form.justification"
          required
          placeholder="Enter justification"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Computadores:" label-for="input-3">
        <b-form-select
          v-model="form.computers"
          :options="options2"
          required
        ></b-form-select>
      </b-form-group>
      
      <b-form-group id="input-group-2" label="Capacidade" label-for="input-2">
        <b-form-input
          v-model="form.qtdPeople"
          required
          placeholder="Enter qtdPeople"
          type="number"
        ></b-form-input>
      </b-form-group>
      
      <b-form-group id="input-group-2" label="Ramal" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.extension"
          required
          placeholder="Enter ramal"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
 
  </div>
</template>

<script>
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
        options: [{ text: 'Select One', value: null }, {text: 'Sim', value: true}, {text: 'Não', value: false}],
        options2: [{ text: 'Select One', value: null }, {text: 'Sim', value: true}, {text: 'Não', value: false}],
        show: true
      };
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = "",
        this.form.description = "",
        this.form.localization = "",
        this.form.responsible = "",
        this.form.special = false,
        this.form.justification = "",
        this.form.disabled = false,
        this.form.computers = false,
        this.form.qtdPeople = "",
        this.form.extension = "",
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
