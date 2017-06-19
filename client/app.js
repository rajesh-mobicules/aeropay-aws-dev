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

Vue.router = router
Vue.use(VueAxios, axios)

Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state, getters } = store

router.beforeEach((route, redirect, next) => {
  console.log(route.meta.auth)
  if (route.meta.auth && !getters.checkAuth) router.push('/login')
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  if (route.path === '/login' || route.path === '/register') {
    store.commit(TOGGLE_SIDEBAR, false)
  } else {
    // console.log(getters.checkAuth)
    // if (!getters.checkAuth) {
    //   // console.log(getters.checkAuth)
    //   router.push('/login')
    // }
    store.commit(TOGGLE_SIDEBAR, true)
  }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
