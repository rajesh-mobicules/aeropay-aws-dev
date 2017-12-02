import { awsAuthenticate, awsSignout } from 'utils/aws_functions'
import { registerMerchant } from 'utils/aero_functions'
import { ID_TOKEN, initHeader } from 'utils/auth_utils'
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
    showIavProfileButton: false,
    userVerified: true,
    companyVerified: true
    // mapAPIKey: 'AIzaSyBXMeMOyfE70CibQn4NaxtHKW7lDqWfgUg'
  },
  mutations: {
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ID_TOKEN: (state, token) => {
      // console.log(tokens)
      state.idToken = token
      window.localStorage.setItem(ID_TOKEN, token)
      initHeader(token)
    },
    DELETE_TOKEN: (state) => {
      state.idToken = null
      window.localStorage.removeItem(ID_TOKEN)
    },
    SET_FUNDING_SOURCE: (state, source) => {
      state.fundingSource = source
    },
    SET_IAV_BUTTON: (state, status) => {
      state.showIavProfileButton = status
    },
    SET_AUTH: (state, status) => {
      state.auth = status
    }
  },

  actions: {
    cognitoLogin ({ commit }, {userInfo, resolveLogin, rejectLogin}) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      function resolveL (token) {
        commit('SET_AUTH', true);
        commit('SET_ID_TOKEN', token)
        resolveLogin();
      }
      function rejectL (err) {
        commit('SET_AUTH', false);
        rejectLogin(err)
      }
      awsAuthenticate(email, password, resolveL, rejectL)
    },
    // checkAuth({ commit }) {
    //   const resolveAuth = () => {
    //     commit('SET_AUTH', true)
    //   }
    //   const rejectAuth = (err) => {
    //     console.log(err)
    //     commit('SET_AUTH', false)
    //   }
    //   checkAwsAuth(resolveAuth, rejectAuth)
    // },
    loginAndRegMerchant ({ commit }, userInfo) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        awsAuthenticate({ email, password })
          .then(tokens => {
            // console.log(tokens.idToken)
            commit('SET_TOKEN', tokens)
            commit('SET_EMAIL', email)
            // console.log('token set')
            registerMerchant(userInfo.data(), tokens.idToken)
              .then(res => {
                resolve(res)
              })
              .catch(err => {
                reject(err)
              })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout ({ commit }) {
      commit('SET_AUTH', false);
      commit('DELETE_TOKEN')
      awsSignout();
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
