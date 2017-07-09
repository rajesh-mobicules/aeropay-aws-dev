import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      meta: {auth: true},
      component: require('../views/dashboard')
    },
    {
      name: 'Login',
      path: '/login',
      meta: {auth: false},
      component: require('../views/auth/Login')
    },
    {
      name: 'Register',
      path: '/register',
      meta: {auth: false},
      component: require('../views/auth/Register')
    },
    {
      name: 'Iav',
      path: '/iav',
      meta: {auth: true},
      component: require('../views/iav')
    },
    {
      path: '/profile',
      redirect: '/profile/basic'
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
