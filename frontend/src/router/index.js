import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from './store'
import SpacesList from '../views/SpacesList.vue';
import DetailSpace from '../views/DetailSpace';
import CheckAvailability from '../views/CheckAvailability';
import RegisterSpace from '../views/RegisterSpace';
import ReservationList from '../views/ReservationList.vue';
import ReservationNormal from '../views/RegisterReservationNormal.vue';
import ReservationRecurring from '../views/RegisterReservationRecurring.vue';
import DetailReserve from '../views/DetailReserve.vue';
import Login from '../views/Login.vue';
import { isSignedIn } from '../services/auth'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter (_, __, next) {
      if (!isSignedIn()) {
        next();
        return;
      }
      next('/home');
    }
  },
  {
    path: '/',
    name: 'home',
    component: SpacesList,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/listar-espacos',
    name: 'spaces',
    component: SpacesList,
    meta: {
      requiresAuth: true
    },
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/detalhes-espaco',
    name: 'detail-space',
    component: DetailSpace,
    props: true,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/detalhes-reserva',
    name: 'detail-reserve',
    component: DetailReserve,
    props: true,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/ver-disponibilidade',
    name: 'check-availability',
    component: CheckAvailability,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/cadastrar-espaco',
    name: 'register-space',
    component: RegisterSpace,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/listar-reservas',
    name: 'reservations',
    component: ReservationList,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/cadastro-reserva-normal',
    name: 'register-reservation-normal',
    component: ReservationNormal,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },
  {
    path: '/cadastro-reserva-recorrente',
    name: 'register-reservation-recurring',
    component: ReservationRecurring,
    beforeEnter (_, __, next) {
      if (isSignedIn()) {
        next();
        return;
      }
      next('/login');
    }
  },

]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (this.store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router