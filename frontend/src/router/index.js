import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SpacesList from '../views/SpacesList.vue'
import ReservationList from '../views/ReservationList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listar-espacos',
    name: 'spaces',
    component: SpacesList
  },
  {
    path: '/cadastrar-espaco',
    name: 'register-space',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterSpace.vue')
  },
  {
    path: '/listar-reservas',
    name: 'reservations',
    component: ReservationList
  }
]

const router = new VueRouter({
  routes
})

export default router
