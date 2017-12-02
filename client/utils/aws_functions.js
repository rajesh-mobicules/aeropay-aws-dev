import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { awsConfig, awsBaseUrl } from './configuration'
// var AWS = require('aws-sdk')
// import apigClientFactory from './apigClient'
var apigClientFactory = require('aws-api-gateway-client').default;
const POOLDATA = {
  UserPoolId: awsConfig.UserPoolId, // dev pool
  ClientId: awsConfig.ClientId // Your client id here
}
const userPool = new CognitoUserPool(POOLDATA)
const APIconfig = { invokeUrl: awsBaseUrl }
export function checkAwsAuth (to, from, next, store) {
  // var apigClient = apigClientFactory.newClient();
  const { state } = store
  const loginFunc = () => {
    store.commit('SET_AUTH', true)
    if (!to.meta.auth) {
      store.commit('TOGGLE_SIDEBAR', false)
    } else if (!state.app.device.isMobile && !state.app.sidebar.opened) {
      store.commit('TOGGLE_SIDEBAR', true)
    }
    next()
  }
  const notLoginFunc = () => {
    store.commit('TOGGLE_SIDEBAR', false)
    store.commit('SET_AUTH', false)
    if (to.meta.auth) {
      console.log('redirecting')
      next('/login')
    } else {
      next()
    }
  }
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        notLoginFunc()
      } else {
        console.log('session validity: ' + session.isValid());
        // AWS.config.region = 'us-east-1'; // Region
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //   IdentityPoolId: 'us-east-1:53a53b4e-f09c-48ed-b8d2-a9927d0e9c8f', // your identity pool id here
        //   Logins: {
        //     // Change the key below according to the specific region your user pool is in.
        //     'cognito-idp.us-east-1.amazonaws.com/us-east-1_nhF9sTRVD': session.getIdToken().getJwtToken()
        //   }
        // });
        // AWS.config.credentials.get(function (err) {
        //   if (err) {
        //     console.log(err);
        //     // window.alert(err);
        //   }
        //   getProfile()
        // });
        loginFunc()
      }
    });
  } else notLoginFunc();
}
export function awsSignout () {
  var cognitoUser = userPool.getCurrentUser();
  cognitoUser.signOut();
}
export function awsRememberDevice () {
  var cognitoUser = userPool.getCurrentUser()
  cognitoUser.setDeviceStatusRemembered({
    onSuccess: function (result) {
      console.log('call result: ' + result);
    },
    onFailure: function (err) {
      console.log(err);
    }
  });
}
export function awsRegister ({ email, password }) {
  const attributeList = []
  const dataEmail = {
    Name: 'email',
    Value: email
  }
  const attributeEmail = new CognitoUserAttribute(dataEmail)
  // const attributeUsername = new CognitoUserAttribute(dataUserName)
  attributeList.push(attributeEmail)
  // attributeList.push(attributeUsername)
  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err)
      } else {
        let cognitoUser = result.user
        // const userAtt = recordUserAttributes(cognitoUser)
        resolve(cognitoUser)
      }
    })
  )
}

export function awsAuthenticate (email, password, resolveLogin, rejectLogin) {
  // create user pool
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new CognitoUser(userData)
  // user authentications
  const authenticationData = {
    Username: email,
    Password: password
  }
  const authenticationDetails = new AuthenticationDetails(authenticationData)
  return cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: result => {
      // console.log(result)
      // const userAtt = recordUserAttributes(cognitoUser)
      // resolve({
      //   accessToken: result.getAccessToken().getJwtToken(),
      //   idToken: result.getIdToken().getJwtToken(),
      //   refreshToken: result.getRefreshToken().getToken(),
      //   userAtt: userAtt
      // })
      resolveLogin(result.getIdToken().getJwtToken())
    },
    onFailure: err => rejectLogin(err)
  })
}

// function recordUserAttributes (cognitoUser) {
//   cognitoUser.getUserAttributes((err, result) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     // for (let i = 0; i < result.length; i++) {
//     //   console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue())
//     // }
//     return result
//   })
// }

export function forgotPassword (email) {
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new CognitoUser(userData)

  return new Promise((resolve, reject) => cognitoUser.forgotPassword({
    onSuccess: data => {
      resolve(data);
    },
    onFailure: err => {
      reject(err)
    }
  }))
}

export function getProfile () {
  var apigClient = apigClientFactory.newClient(APIconfig);
  const pathTemplate = 'profileForMerchant'
  const method = 'GET'
  apigClient.invokeApi({}, pathTemplate, method)
    .then(function (result) {
      console.log(result)
      // Add success callback code here.
    }).catch(function (result) {
      console.log(result)
      // Add error callback code here.
    });
}
