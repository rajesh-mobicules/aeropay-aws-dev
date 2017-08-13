import { awsAuthenticate } from 'utils/aws_functions'
import { registerMerchant } from 'utils/aero_functions'
// var getLocal = window.localStorage.getItem
const user = {
  state: {
    email: '',
    auth: false,
    accessToken: window.localStorage.getItem('accessToken'),
    idToken: window.localStorage.getItem('idToken'),
    refreshToken: window.localStorage.getItem('refreshToken'),
    accountAdded: false,
    fundingSource: null,
    showIavProfileButton: false,
    userVerified: true,
    companyVerified: true
  },
  mutations: {
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_TOKEN: (state, tokens) => {
      // console.log(tokens)
      for (let key in tokens) {
        window.localStorage.setItem(key, tokens[key])
        state[key] = tokens[key]
      }
    },
    DELETE_TOKEN: (state, token) => {
      state[token] = null
      window.localStorage.removeItem(token)
    },
    SET_FUNDING_SOURCE: (state, source) => {
      state.fundingSource = source
    },
    SET_IAV_BUTTON: (state, status) => {
      state.showIavProfileButton = status
    }
  },

  actions: {
    cognitoLogin ({ commit }, userInfo) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        awsAuthenticate({email, password})
          .then(result => {
            // console.log(result)
            const { accessToken, idToken, refreshToken } = result
            // const userAtt = result.userAtt
            commit('SET_TOKEN', {accessToken, idToken, refreshToken})
            commit('SET_EMAIL', email)
            // commit('')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loginAndRegMerchant ({ commit }, userInfo) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        awsAuthenticate({email, password})
          .then(tokens => {
            // console.log(tokens.idToken)
            commit('SET_TOKEN', tokens)
            commit('SET_EMAIL', email)
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
      return new Promise(resolve => {
        commit('DELETE_TOKEN', 'accessToken')
        commit('DELETE_TOKEN', 'idToken')
        commit('DELETE_TOKEN', 'refreshToken')
        commit('SET_FUNDING_SOURCE', null)
        // window.localStorage.removeItem('JWT')
        resolve()
      })
    }
  }
}

export default user
