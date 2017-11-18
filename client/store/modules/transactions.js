const state = {
  page: 1,
  limit: 10
}

const mutations = {
  SET_TRANS_PAGE (state, page) {
    state.page = page
  },

  SET_TRANS_LIMIT (state, limit) {
    state.limit = limit
  }
}

export default {
  state,
  mutations
}
