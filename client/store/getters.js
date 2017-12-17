// import { checkAwsAuth } from 'utils/aws_functions'
import {decodeJwt} from 'utils/auth_utils'
const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
export const navbar = state => state.app.navbar
const effect = state => state.app.effect
const menuitems = state => state.menu.items
const idToken = state => state.user.idToken
export const profile = state => state.user.profile
export const merchant = state => state.user.merchant
const fundingSource = state => state.user.fundingSource
const mapAPIKey = state => state.user.mapAPIKey
const email = state => {
  const jwt = state.user.idToken
  const decoded = decodeJwt(jwt)
  return decoded === null ? '' : decoded.email
}
const checkAuth = state => {
  const jwt = state.user.idToken
  if (jwt === null || jwt === undefined || jwt === '') return false
  const decoded = decodeJwt(jwt)
  return decoded === null ? false : decoded.exp > Date.now() / 1000
}
// async function checkAuth (state) {
//   const auth = await checkAwsAuth()
//   if (auth === true) return true
//   else return false
// }
// const email = state => state.user.email
// const checkAuth = state => state.user.auth
const apiClient = state => state.user.apiClient
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}
const userVerified = state => state.user.userVerified
const companyVerified = state => state.user.companyVerified

const transPage = state => state.transactions.page
const transLimit = state => state.transactions.limit

export const transSum = state => state.user.transSum

export const cusPage = state => state.customer.page
export const cusLimit = state => state.customer.limit
export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  fundingSource,
  menuitems,
  idToken,
  email,
  checkAuth,
  componententry,
  userVerified,
  companyVerified,
  transPage,
  transLimit,
  apiClient,
  mapAPIKey
}
