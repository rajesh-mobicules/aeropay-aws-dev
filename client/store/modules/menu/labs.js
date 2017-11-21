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
  component: lazyLoading('labs', true),
  children: [
    {
      name: 'Gallery',
      path: 'gallery',
      meta: {
        link: 'labs/labs.vue',
        auth: true
      },
      component: lazyLoading('labs/Labs')
    },
    {
      name: 'Analytics',
      path: 'analytics',
      meta: {
        link: 'labs/Analytics.vue',
        auth: true
      },
      component: lazyLoading('labs/Analytics')
    }
  ]
}
