import lazyLoading from './lazyLoading'

export default {
  name: 'Help',
  path: '/help',
  meta: {
    icon: 'fa-question',
    expanded: false,
    link: 'help/index.vue',
    auth: true
  },
  component: lazyLoading('help', true)
}
