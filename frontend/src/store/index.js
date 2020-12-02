import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import apiConfig from '../services/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titlePage: "",
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    setTitle(state, payload) {
      state.titlePage = payload;
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
      // state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    async login({ commit }, data) {
      // return new Promise((resolve, reject) => {
      let endpoint = 'login'
      commit('auth_request')
      try {
        let result = await apiConfig.post(`/${endpoint}/`, data)
        const token = result.data.token
        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-access-token'] = token
        commit('auth_success', token)
        window.console.log(result);

      } catch (error) {
        window.console.log(error)
      }

      // axios({ url: 'http://localhost:3333/login', data, method: 'POST' })
      //   .then(resp => {
      //     const token = resp.data.token
      //     const user = resp.data.user
      //     localStorage.setItem('token', token)
      //     axios.defaults.headers.common['Authorization'] = token
      //     commit('auth_success', token, user)
      //     resolve(resp)
      //   })
      //   .catch(err => {
      //     commit('auth_error')
      //     localStorage.removeItem('token')
      //     reject(err)
      //   })
      // })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    titlePage: state => state.titlePage,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
