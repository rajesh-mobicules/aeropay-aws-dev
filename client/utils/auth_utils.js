import axios from 'axios';
const initHeader = (token) => {
  axios.defaults.headers.common[AUTH_HEADER] = token;
}

const ID_TOKEN = 'idToken'
const AUTH_HEADER = 'requestAuthorization'

export { initHeader, ID_TOKEN, AUTH_HEADER }
