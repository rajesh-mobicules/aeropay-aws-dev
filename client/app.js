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
import { withApiClient } from 'utils/apiClient'
// import { checkAwsAuth } from 'utils/aws_functions'
import VueScrollTo from 'vue-scrollto'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { locale })
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

const { state, getters, commit } = store

// const hasAccessRight = (auth, currenRole) => {

// }

router.beforeEach((to, from, next) => {
  // console.log(to.meta.auth, !getters.checkAuth)
  // if (to.meta.auth && !getters.checkAuth) {
  //   console.log('redirecting')
  //   next('/login')
  // }
  // if (!getters.checkAuth || !to.meta.auth) {
  //   store.commit(TOGGLE_SIDEBAR, false)
  // } else if (!state.app.device.isMobile && !state.app.sidebar.opened) {
  //   store.commit(TOGGLE_SIDEBAR, true)
  // }
  // if (getters.checkAuth && (to.path === '/login' || to.path === '/register')) {
  //   next('/transactions')
  // }
  if (!getters.checkAuth) {
    if (to.meta.auth) {
      console.log('redirecting')
      next('/login')
    } else {
      commit(TOGGLE_SIDEBAR, false)
      next()
    }
  } else {
    if (!state.app.device.isMobile && !state.app.sidebar.opened) {
      commit(TOGGLE_SIDEBAR, true)
    }
    if (to.path === '/login' || to.path === '/register') {
      next('/transactions')
    }
    withApiClient(next, store);
  }

  // const togleSidebar = (status) => {
  //   store.commit(TOGGLE_SIDEBAR, status)
  // }
  // checkAwsAuth(to, from, next, store)
  // next()
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
