import axios from 'axios';
const initHeader = (token) => {
  axios.defaults.headers.common[AUTH_HEADER] = token;
}

const ACCESS_TOKEN = 'idToken'
const AUTH_HEADER = 'Authorization'

export { initHeader, ACCESS_TOKEN, AUTH_HEADER }
