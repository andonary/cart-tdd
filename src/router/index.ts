import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MarketPlace from '../views/MarketPlace.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MarketPlace',
    component: MarketPlace
  },
  {
    path: '/vault',
    name: 'Vault',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Vault.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
