import lazyLoading from './lazyLoading'
export default {
  name: 'Account',
  path: '/account',
  meta: {
    icon: 'fa-user-circle',
    expanded: false,
    isExpandAble: false,
    link: 'account/index.vue',
    auth: true
  },
  component: lazyLoading('account', true),
  children: [
    {
      name: 'Info',
      path: 'info',
      meta: {
        link: 'account/Info.vue',
        auth: true
      },
      component: lazyLoading('account/Info')
    },
    {
      name: 'Locations',
      path: 'locations',
      meta: {
        link: 'account/Locations.vue',
        auth: true
      },
      component: lazyLoading('account/Locations')
    },
    {
      name: 'Billing',
      path: 'billing',
      meta: {
        link: 'account/Billing.vue',
        auth: true
      },
      component: lazyLoading('account/Billing')
    }
  ]
}
