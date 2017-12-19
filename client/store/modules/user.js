import { awsAuthenticate, awsSignout } from 'utils/aws_functions'
import { registerMerchant } from 'utils/aero_functions'
import { ID_TOKEN } from 'utils/auth_utils'
import { buildApiClient } from 'utils/apiClient'
var jwtDecode = require('jwt-decode');
// var getLocal = window.localStorage.getItem
const user = {
  state: {
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
    mapAPIKey: 'AIzaSyBXMeMOyfE70CibQn4NaxtHKW7lDqWfgUg',
    decoded: {},
    transSum: {}
  },
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
      // const resolveAuth = () => {
      //   commit('SET_AUTH', true)
      // }
      // const rejectAuth = (err) => {
      //   console.log(err)
      //   commit('SET_AUTH', false)
      // }
      const decoded = jwtDecode(state.idToken)
      commit('SET_DECODED', decoded)
    },
    loginAndRegMerchant ({ commit, getters }, {formData, resolveData, rejectData}) {
      const email = formData.email.trim()
      const password = formData.password
      // function register (token) {
      //   registerMerchant(token, formData)
      //     .then(() => resolveData())
      //     .catch(err => rejectData(err))
      // }
      function register (apiClient) {
        registerMerchant(apiClient, formData)
          .then(() => resolveData())
          .catch(err => rejectData(err.message))
      }
      function resolveL (token) {
        commit('SET_ID_TOKEN', token)
        commit('SET_EMAIL', email)
        // register(token)
        buildApiClient(commit, getters, register)
      }
      function rejectL (err) {
        commit('REMOVE_ID_TOKEN');
        rejectData(err)
      }
      awsAuthenticate(email, password, resolveL, rejectL)
      // return new Promise((resolve, reject) => {
          // .then(tokens => {
          //   // console.log(tokens.idToken)
          //   commit('SET_TOKEN', tokens)
          //   commit('SET_EMAIL', email)
          //   // console.log('token set')
          //   registerMerchant(formData.data(), tokens.idToken)
          //     .then(res => {
          //       resolve(res)
          //     })
          //     .catch(err => {
          //       reject(err)
          //     })
          // })
          // .catch(error => {
          //   reject(error)
          // })
      // })
    },
    logout ({ commit }, router) {
      commit('REMOVE_ID_TOKEN');
      commit('SET_API_CLIENT', null);
      awsSignout();
      router.push('/login')
      // return new Promise(resolve => {
      //   commit('DELETE_TOKEN', 'accessToken')
      //   commit('DELETE_TOKEN', 'idToken')
      //   commit('DELETE_TOKEN', 'refreshToken')
      //   commit('SET_FUNDING_SOURCE', null)
      //   // window.localStorage.removeItem('JWT')
      //   resolve()
      // })
    }
  }
}

export default user
