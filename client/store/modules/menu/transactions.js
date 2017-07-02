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
  component: lazyLoading('transactions', true)
}
