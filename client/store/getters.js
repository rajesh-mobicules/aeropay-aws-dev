import jwtDecode from 'jwt-decode'
// import { checkAwsAuth } from 'utils/aws_functions'
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
const mapAPIKey = state => state.user.mapAPIKey
const email = state => {
  const jwt = state.user.accessToken
  if (jwt === null || jwt === '') return ''
  const decoded = jwtDecode(state.user.accessToken)
  return decoded.username
}
// async function checkAuth (state) {
//   const auth = await checkAwsAuth()
//   if (auth === true) return true
//   else return false
// }
const checkAuth = state => state.user.auth
const showIavProfileButton = state => state.user.showIavProfileButton
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}
const userVerified = state => state.user.userVerified
const companyVerified = state => state.user.companyVerified

const transPage = state => state.transactions.page
const transLimit = state => state.transactions.limit

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
  companyVerified,
  transPage,
  transLimit,
  mapAPIKey
}
