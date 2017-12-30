import { awsAuthenticate, awsSignout } from 'utils/aws_functions'
import { registerMerchant } from 'utils/aero_functions'
import { ID_TOKEN } from 'utils/auth_utils'
import { buildApiClient } from 'utils/apiClient'
var jwtDecode = require('jwt-decode');
// var getLocal = window.localStorage.getItem
const rawState = {
  email: '',
  auth: false,
  // accessToken: window.localStorage.getItem('accessToken'),
  idToken: window.localStorage.getItem('idToken'),
  // refreshToken: window.localStorage.getItem('refreshToken'),
  accountAdded: false,
  fundingSource: null,
  userVerified: true,
  companyVerified: true,
  apiConfig: {},
  apiClient: null,
  profile: null,
  merchant: null,
  user: null,
  locations: [],
  mapAPIKey: 'AIzaSyBXMeMOyfE70CibQn4NaxtHKW7lDqWfgUg',
  decoded: {},
  transSum: {}
}
const user = {
  state: rawState,
  mutations: {
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ID_TOKEN: (state, token) => {
      // console.log(tokens)
      state.idToken = token
      window.localStorage.setItem(ID_TOKEN, token)
      // initHeader(token)
    },
    REMOVE_ID_TOKEN: (state) => {
      window.localStorage.removeItem(ID_TOKEN)
      state.idToken = null
    },
    LOG_OUT: (state) => {
      window.localStorage.removeItem(ID_TOKEN)
      state = rawState
      state.idToken = null
      state.apiClient = null
      state.locations = null
      state.user = null
    },
    REMOVE_ALL: () => {
      window.localStorage.clear()
      // this.state = rawState
    },
    // DELETE_TOKEN: (state) => {
    //   state.idToken = null
    //   window.localStorage.removeItem(ID_TOKEN)
    // },
    SET_FUNDING_SOURCE: (state, source) => {
      state.fundingSource = source
    },
    SET_API_CLIENT: (state, apiClient) => {
      state.apiClient = apiClient
    },
    SET_DECODED: (state, decoded) => {
      state.decoded = decoded
    },
    SET_PROFILE: (state, profile) => {
      state.profile = profile
    },
    SET_MERCHANT: (state, merchant) => {
      state.merchant = merchant
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_LOCATIONS: (state, locations) => {
      state.locations = locations
    },
    SET_TRANS_SUMMARY: (state, transSum) => {
      state.transSum = transSum
    }
  },

  actions: {
    cognitoLogin ({ commit }, {userInfo, resolveLogin, rejectLogin}) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      function resolveL (token) {
        commit('SET_ID_TOKEN', token)
        commit('SET_EMAIL', email)
        resolveLogin();
      }
      function rejectL (err) {
        commit('REMOVE_ID_TOKEN');
        rejectLogin(err)
      }
      awsAuthenticate(email, password, resolveL, rejectL)
    },
    checkAuth({ commit, state }) {
      const decoded = jwtDecode(state.idToken)
      commit('SET_DECODED', decoded)
    },
    loginAndRegMerchant ({ commit, getters }, {formData, resolveData, rejectData}) {
      const email = formData.email.trim()
      const password = formData.password
      function register (apiClient) {
        registerMerchant(apiClient, formData)
          .then(() => resolveData())
          .catch(err => rejectData(err.message))
      }
      function resolveL (token) {
        commit('SET_ID_TOKEN', token)
        commit('SET_EMAIL', email)
        // register(token)
        setTimeout(() => buildApiClient(commit, getters, register), 100)
      }
      function rejectL (err) {
        commit('REMOVE_ID_TOKEN');
        rejectData(err)
      }
      awsAuthenticate(email, password, resolveL, rejectL)
    },
    logout ({ commit }, router) {
      // commit('REMOVE_ID_TOKEN');
      commit('LOG_OUT');
      awsSignout();
      router.push('/login')
      commit('REMOVE_ALL');
    }
  }
}

export default user
