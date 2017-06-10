import lazyLoading from './lazyLoading'

export default {
  name: 'Transactions',
  path: '/transactions',
  meta: {
    icon: 'fa-usd',
    expanded: false,
    link: 'transactions/index.vue',
    auth: true
  },
  component: lazyLoading('transactions', true),

  children: [
    {
      name: 'Monthly',
      path: 'monthly',
      component: lazyLoading('transactions/Monthly'),
      meta: {
        link: 'transactions/Monthly.vue'
      }
    },
    {
      name: 'Daily',
      path: 'daily',
      component: lazyLoading('transactions/Daily'),
      meta: {
        link: 'transactions/Daily.vue'
      }
    },
    {
      name: 'Yearly',
      path: 'yearly',
      component: lazyLoading('transactions/Yearly'),
      meta: {
        link: 'transactions/Yearly.vue'
      }
    }
  ]
}
