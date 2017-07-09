import lazyLoading from './lazyLoading'

export default {
  name: 'Profile',
  path: '/profile',
  meta: {
    icon: 'fa-user-circle',
    expanded: false,
    link: 'profile/index.vue',
    auth: true
  },
  component: lazyLoading('profile', true),
  children: [
    {
      name: 'Basic',
      path: 'basic',
      meta: {
        link: 'profile/Basic.vue'
      },
      component: lazyLoading('profile/Basic')
    },
    {
      name: 'Locations',
      path: 'locations',
      meta: {
        link: 'profile/Locations.vue'
      },
      component: lazyLoading('profile/Locations')
    },
    {
      name: 'Billing',
      path: 'billing',
      meta: {
        link: 'profile/Billing.vue'
      },
      component: lazyLoading('profile/Billing')
    }
  ]
}
