import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) !== true;
      console.info(isAuthor);
      // console.info(JSON.parse(isAuthor) !== true);
      if (to.name !== 'Login' && isAuthor) next({ name: 'Login' });
      // if (JSON.parse(isAuthor) !== true) next({ name: 'Login' });
      else next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "register" */ '../views/LoginView.vue'),
    // meta: { guest: true },
    // beforeEnter: (to, from, next) => {
    //   const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) !== true;
    //   console.info(isAuthor);
    //   // console.info(JSON.parse(isAuthor) !== true);
    //   if (to.name === 'Login' && isAuthor) next({ name: 'Home' });
    //   // if (JSON.parse(isAuthor) !== true) next({ name: 'Login' });
    //   // else next({ name: 'Login' });
    //   else next();
    // }
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
