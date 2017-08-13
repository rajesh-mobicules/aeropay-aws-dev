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
const fundingSource = state => state.user.fundingSource
const email = state => {
  const jwt = state.user.accessToken
  if (jwt === null || jwt === '') return ''
  const decoded = jwtDecode(state.user.accessToken)
  return decoded.username
}
const checkAuth = state => {
  const jwt = state.user.accessToken
  if (jwt === null || jwt === '') return false
  const decoded = jwtDecode(state.user.accessToken)
  if (decoded.exp < Date.now() / 1000) {
    return false
  }
  return true
}
const showIavProfileButton = state => state.user.showIavProfileButton
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}
const userVerified = state => state.user.userVerified
const companyVerified = state => state.user.companyVerified

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  fundingSource,
  menuitems,
  accessToken,
  idToken,
  refreshToken,
  showIavProfileButton,
  email,
  checkAuth,
  componententry,
  userVerified,
  companyVerified
}
