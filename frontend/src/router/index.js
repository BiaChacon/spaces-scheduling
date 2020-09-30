import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SpacesList from '../views/SpacesList.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterSpace.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
