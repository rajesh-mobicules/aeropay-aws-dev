import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { awsConfig } from './configuration'
// var apigClientFactory = require('aws-api-gateway-client').default;
// var AWS = require('aws-sdk')

const POOLDATA = {
  UserPoolId: awsConfig.UserPoolId, // dev pool
  ClientId: awsConfig.ClientId // Your client id here
}
const userPool = new CognitoUserPool(POOLDATA)

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
      console.log(result)
      console.log(err)
      if (err) {
        reject(err)
      } else {
        // let cognitoUser = result.user
        // const userAtt = recordUserAttributes(cognitoUser)
        resolve()
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
      // setApiClient(store)
      resolveLogin(result.getIdToken().getJwtToken())
    },
    onFailure: err => rejectLogin(err)
  })
}

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
