import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import transactions from './transactions'
import settings from './settings'
import profile from './profile'
import help from './help'
// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Transaction Analytics',
      path: '/transactionanalytics',
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue',
        auth: true
      },
      component: lazyLoading('dashboard', true)
    },
    transactions,
    {
      name: 'Customers',
      path: '/customers',
      meta: {
        icon: 'fa-address-card-o',
        link: 'customers/index.vue',
        auth: true
      },
      component: lazyLoading('customers', true)
    },
    profile,
    settings,
    help
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
