import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
import { VueMaskDirective } from 'v-mask';
import VueSimpleAlert from "vue-simple-alert";

Vue.prototype.$http = Axios;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.directive('mask', VueMaskDirective);
Vue.use(VueSimpleAlert);

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')