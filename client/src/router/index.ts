import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) === true;
      // console.info(isAuthor);
      // console.info(JSON.parse(isAuthor) !== true);
      // if (to.name !== 'Login' && isAuthor) next({ name: 'Login' });
      if (!isAuthor) next({ name: 'Login' });
      else next();
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) === true;
      // console.info(isAuthor);
      // console.info(JSON.parse(isAuthor) !== true);
      // if (to.name !== 'Login' && isAuthor) next({ name: 'Login' });
      if (!isAuthor) next({ name: 'Login' });
      else next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) === true;
      if (isAuthor) next({ name: 'Home' });
      else next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    // meta: { guest: true },
    beforeEnter: (to, from, next) => {
      const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) === true;
      if (isAuthor) next({ name: 'Home' });
      else next();
    }
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
    component: () => import(/* webpackChunkName: "post" */ '../views/PostForm.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) === true;
      // console.info(isAuthor);
      // console.info(JSON.parse(isAuthor) !== true);
      // if (to.name !== 'Login' && isAuthor) next({ name: 'Login' });
      if (!isAuthor) next({ name: 'Login' });
      else next();
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
