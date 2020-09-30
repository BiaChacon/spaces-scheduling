<template>
  <div>
    <h1>Register Page</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Nome: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="space.name"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      space: {
        id: "",
        name: "",
        description: "",
        localization: "",
        responsible: "",
        special: false,
        justification: "",
        disabled: false,
        computers: false,
        qtdPeople: "",
        extension: "",
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.space.name = "";
      this.space.description = "";
      this.space.localization = "";
    },
  },
};
</script>
<style lang="less" scoped>
</style>