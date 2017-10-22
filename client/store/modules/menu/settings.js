import lazyLoading from './lazyLoading'

export default {
  name: 'Settings',
  path: '/settings',
  meta: {
    icon: 'fa-cogs',
    expanded: false,
    link: 'settings/index.vue',
    auth: true
  },
  component: lazyLoading('settings', true)
}
