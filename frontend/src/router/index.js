import Vue from 'vue';
import VueRouter from 'vue-router';

import SpacesList from '../views/SpacesList.vue';
import CheckAvailability from '../views/CheckAvailability';
import RegisterSpace from '../views/RegisterSpace';
import ReservationList from '../views/ReservationList.vue';
import ReservationNormal from '../views/RegisterReservationNormal.vue';
import ReservationRecurring from '../views/RegisterReservationRecurring.vue';

Vue.use(VueRouter);

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
    path: '/ver-disponibilidade',
    name: 'check-availability',
    component: CheckAvailability
  },
  {
    path: '/cadastrar-espaco',
    name: 'register-space',
    component: RegisterSpace
  },
  {
    path: '/listar-reservas',
    name: 'reservations',
    component: ReservationList
  },
  {
    path: '/cadastro-reserva-normal',
    name: 'register-reservation-normal',
    component: ReservationNormal
  },
  {
    path: '/cadastro-reserva-recorrente',
    name: 'register-reservation-recurring',
    component: ReservationRecurring
  },
]

const router = new VueRouter({
  routes
})

export default router
