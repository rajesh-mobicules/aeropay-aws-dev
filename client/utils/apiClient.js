import { awsConfig, awsBaseUrl, awsRegion } from './configuration'
import { getAnalatics, getLocations, getProfile } from 'utils/aero_functions'
import { parsePJString } from 'utils/auth_utils'

var apigClientFactory = require('aws-api-gateway-client').default;
var AWS = require('aws-sdk')
const APIconfig = {
  invokeUrl: awsBaseUrl,
  region: awsRegion // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
}

export const buildApiClient = (commit, getters, register) => {
  if (getters.apiClient === null || getters.apiClient === undefined) {
    AWS.config.region = awsRegion // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: awsConfig.IdentityPoolId, // your identity pool id here
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        [awsConfig.LoginsId]: getters.idToken
      }
    })
    AWS.config.credentials.get(err => {
      if (err) {
        console.log(err);
        // window.alert(err);
      }
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
      // var identityId = AWS.config.credentials.identityId;
      // console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
      APIconfig.accessKey = accessKeyId;
      APIconfig.secretKey = secretAccessKey;
      APIconfig.sessionToken = sessionToken;
      var apigClient = apigClientFactory.newClient(APIconfig);
      register(apigClient)
      commit('SET_API_CLIENT', apigClient)
    })
  }
}

export const withApiClient = (next, store) => {
  if (store.getters.apiClient !== null && store.getters.apiClient !== undefined) {
    next()
  } else {
    store.commit('SET_LOADING_API', true)
    const idToken = store.getters.idToken
    AWS.config.region = awsRegion // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: awsConfig.IdentityPoolId, // your identity pool id here
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        [awsConfig.LoginsId]: idToken
      }
    })
    AWS.config.credentials.get(err => {
      if (err) {
        console.log(err);
        // window.alert(err);
      }
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
      // var identityId = AWS.config.credentials.identityId;
      // console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
      APIconfig.accessKey = accessKeyId;
      APIconfig.secretKey = secretAccessKey;
      APIconfig.sessionToken = sessionToken;
      var apigClient = apigClientFactory.newClient(APIconfig);
      store.commit('SET_API_CLIENT', apigClient)
      const email = store.getters.email
      getProfile(apigClient, email)
        .then(
          ({ data }) => {
            // if (data.success) {
            const merchant = parsePJString(data.merchant)
            const user = parsePJString(data.user)
            store.commit('SET_PROFILE', data.profile)
            store.commit('SET_MERCHANT', merchant)
            store.commit('SET_USER', user)
            store.commit('SET_LOADING_API', false)
            getLocations(apigClient, merchant.merchantId)
              .then(({data}) => store.commit('SET_LOCATIONS', data.locations))
              .catch(err => console.log(err))
            getAnalatics(apigClient, merchant.merchantId)
              .then(({data}) => store.commit('SET_TRANS_SUMMARY', data.result))
              .catch(err => console.log(err))
            // }
            next()
          }
        )
        .catch(
          err => {
            console.log(err)
            next()
          }
        )
    })
  }
}
