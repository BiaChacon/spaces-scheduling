import Vue from 'vue'
import VueRouter from 'vue-router'
import SpacesList from '../views/SpacesList.vue'
import ReservationList from '../views/ReservationList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SpacesList
  },
  {
    path: '/listar-espacos',
    name: 'spaces',
    component: SpacesList
  },
  {
    path: '/cadastrar-espaco',
    name: 'register-space',
    component: () => import('../views/RegisterSpace.vue')
  },
  {
    path: '/listar-reservas',
    name: 'reservations',
    component: ReservationList
  },
  {
    path: '/cadastro-reserva',
    name: 'register-reservation',
    component: () => import('../views/ReservationRegister.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
