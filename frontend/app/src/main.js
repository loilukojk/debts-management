import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './api/main';
import VueRouter from 'vue-router';
import DebtsManagement from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import store from './store/index';

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: DebtsManagement,
    meta: {
      requiresAuth: true,
    }
  },
  { path: '/login', component: LoginPage }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
