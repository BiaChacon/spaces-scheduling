import Vue from 'vue';
import VueRouter from 'vue-router';
import SpacesList from '../views/SpacesList.vue';
import DetailSpace from '../views/DetailSpace';
import CheckAvailability from '../views/CheckAvailability';
import RegisterSpace from '../views/RegisterSpace';
import ReservationList from '../views/ReservationList.vue';
import ReservationNormal from '../views/RegisterReservationNormal.vue';
import ReservationRecurring from '../views/RegisterReservationRecurring.vue';
import DetailReserve from '../views/DetailReserve.vue';
import Login from '../views/Login.vue';
import beforeEach from './beforeEach'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: SpacesList,
  },
  {
    path: '/listar-espacos',
    name: 'spaces',
    component: SpacesList,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/detalhes-espaco',
    name: 'detail-space',
    component: DetailSpace,
    props: true,
  },
  {
    path: '/detalhes-reserva',
    name: 'detail-reserve',
    component: DetailReserve,
    props: true,
  },
  {
    path: '/ver-disponibilidade',
    name: 'check-availability',
    component: CheckAvailability,
  },
  {
    path: '/cadastrar-espaco',
    name: 'register-space',
    component: RegisterSpace,
  },
  {
    path: '/listar-reservas',
    name: 'reservations',
    component: ReservationList,
  },
  {
    path: '/cadastro-reserva-normal',
    name: 'register-reservation-normal',
    component: ReservationNormal,
  },
  {
    path: '/cadastro-reserva-recorrente',
    name: 'register-reservation-recurring',
    component: ReservationRecurring,
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(beforeEach);

export default router