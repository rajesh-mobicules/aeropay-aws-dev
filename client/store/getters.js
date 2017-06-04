import jwtDecode from 'jwt-decode'
const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items
const accessToken = state => state.user.accessToken
const idToken = state => state.user.idToken
const refreshToken = state => state.user.refreshToken
const email = state => state.user.email
const iavToken = state => state.user.iavToken

const checkAuth = state => {
  const jwt = state.user.accessToken
  if (jwt === null || jwt === '') return false
  const decoded = jwtDecode(state.user.accessToken)
  if (decoded.exp < Date.now() / 1000) {
    return false
  }
  return true
}

const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  accessToken,
  idToken,
  iavToken,
  refreshToken,
  email,
  checkAuth,
  componententry
}
