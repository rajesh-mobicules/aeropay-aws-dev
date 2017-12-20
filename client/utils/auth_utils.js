import axios from 'axios';
var jwtDecode = require('jwt-decode');
const initHeader = (token) => {
  axios.defaults.headers.common[AUTH_HEADER] = token;
}

const decodeJwt = (jwt) => {
  let decoded = null;
  if (jwt === null || jwt === '') return decoded;
  try {
    decoded = jwtDecode(jwt)
  } catch (err) {
  }
  return decoded;
}

const ID_TOKEN = 'idToken'
const AUTH_HEADER = 'requestAuthorization'

export const parsePJString = (pjString) => {
  return JSON.parse(pjString.replace(/"/g, "").replace(/'/g, '"'))
}
export { initHeader, ID_TOKEN, AUTH_HEADER, decodeJwt }
