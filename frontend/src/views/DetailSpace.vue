<template>
  <div>{{space.id}}</div>
</template>
<script>
import ApiService from '../services/ApiService';
const http = new ApiService('spaces');

export default {
  data: () => ({
    space: {id:"", name:""}
  }),
  async created() {
    let response = await http.getList('spaces');
    this.space = response.data[1];
  },
  methods: {
    
  }
};
</script>