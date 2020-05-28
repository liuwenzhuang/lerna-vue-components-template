import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import demos from './components/'

const routes: any = demos.map((demo) => ({
  path: `/${demo.key}`,
  component: demo.sample,
}))

routes.unshift({
  path: '/',
  redirect: `/${demos[0].key}`,
})

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
