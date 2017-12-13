import * as types from '../mutation-types'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  navbar: {
    show: true
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, opened) {
    // if (state.device.isMobile) {
    //   state.sidebar.opened = opened
    // } else {
    //   state.sidebar.opened = true
    // }
    state.sidebar.opened = opened
  },
  TOGGLE_SIDEBAR_HIDDEN (state, hidden) {
    state.sidebar.hidden = hidden
  },
  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },
  TOGGLE_NAVBAR (state, show) {
    state.navbar.show = show
  }
}

export default {
  state,
  mutations
}
