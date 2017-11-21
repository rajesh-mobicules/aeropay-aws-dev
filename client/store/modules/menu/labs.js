import lazyLoading from './lazyLoading'

export default {
  name: 'Labs',
  path: '/labs',
  meta: {
    icon: 'fa-flask',
    expanded: false,
    link: 'labs/index.vue',
    auth: true
  },
  component: lazyLoading('labs', true)
}
