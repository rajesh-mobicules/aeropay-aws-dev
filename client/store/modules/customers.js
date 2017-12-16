const state = {
  page: 1,
  limit: 10
}

const mutations = {
  SET_CUS_PAGE (state, page) {
    state.page = page
  },

  SET_CUS_LIMIT (state, limit) {
    state.limit = limit
  }
}

export default {
  state,
  mutations
}
