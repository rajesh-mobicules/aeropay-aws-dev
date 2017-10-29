import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import { ID_TOKEN, initHeader } from 'utils/auth_utils'
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo)

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.router = router
Vue.use(VueAxios, axios)

Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state, getters } = store

// const hasAccessRight = (auth, currenRole) => {

// }

router.beforeEach((to, from, next) => {
  // console.log(to.meta.auth, !getters.checkAuth)
  if (to.meta.auth && !getters.checkAuth) {
    console.log('redirecting')
    next('/login')
  }
  if (!getters.checkAuth || !to.meta.auth) {
    store.commit(TOGGLE_SIDEBAR, false)
  } else if (!state.app.device.isMobile && !state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, true)
  }
  // if (to.path === '/login' || to.path === '/register') {
  //   store.commit(TOGGLE_SIDEBAR, false)
  // } else {
  //   // console.log(getters.checkAuth)
  //   // if (!getters.checkAuth) {
  //   //   // console.log(getters.checkAuth)
  //   //   router.push('/login')
  //   // }
  //   store.commit(TOGGLE_SIDEBAR, true)
  // }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const header = window.localStorage.getItem(ID_TOKEN);
if (header) {
  initHeader(header);
}

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
