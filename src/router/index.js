import Vue from 'vue'
import VueRouter from 'vue-router'
import My from './my.js'
import Doctor from './doctor'
import Auth from './auth'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/doctor/index.vue'),
    meta: {
      title: '医生列表'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/my/index.vue'),
    meta: {
      title: '我的'
    }
  },
  ...Auth,
  ...Doctor,
  ...My
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router