import lazyLoading from './lazyLoading'

export default {
  name: 'Locations',
  path: '/locations',
  meta: {
    icon: 'fa-location-arrow',
    expanded: false,
    isExpandAble: false,
    link: 'locations/index.vue',
    auth: true
  },
  component: lazyLoading('locations', true)
}
