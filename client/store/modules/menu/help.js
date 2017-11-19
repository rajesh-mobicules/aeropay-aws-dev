import lazyLoading from './lazyLoading'

export default {
  name: 'Support',
  path: '/support',
  meta: {
    icon: 'fa-question',
    expanded: false,
    link: 'support/index.vue',
    auth: true
  },
  component: lazyLoading('support', true)
}
