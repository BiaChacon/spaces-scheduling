import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
