import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home.vue'
const Home = () => import( /* webpackChunkName: 'Home' */ './views/home.vue' )
const User = () => import( /* webpackChunkName: 'User' */ './views/user.vue' )
const Login = () => import( /* webpackChunkName: 'Login' */ './views/login.vue' )
const Search = () => import( /* webpackChunkName: 'Search' */ './views/search.vue' )
// import User from './views/user.vue'
// import Login from './views/login.vue'
// import Search from './views/search.vue'

Vue.use( Router )

export default new Router( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/User.vue')
      component: User
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
  ]
} )
