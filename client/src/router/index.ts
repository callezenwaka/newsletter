import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "register" */ '../views/LoginView.vue')
  },
  {
    path: '/author',
    name: 'Author',
    component: () => import(/* webpackChunkName: "author" */ '../views/AuthorView.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/PostView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
