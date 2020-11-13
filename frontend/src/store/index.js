import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titlePage: ""
  },
  mutations: {
    setTitle(state, payload) {
      state.titlePage = payload;
    }
  },
  actions: {

  },
  getters: {
    titlePage: state => state.titlePage
  }
})
