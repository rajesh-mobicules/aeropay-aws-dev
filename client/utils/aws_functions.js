import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { awsConfig } from './dev_configuration'

const POOLDATA = {
  UserPoolId: awsConfig.UserPoolId, // dev pool
  // UserPoolId: 'us-east-1_fWjpODvHX', // prod pool
  ClientId: awsConfig.ClientId // Your client id here
}

export function awsRegister ({email, password}) {
  const poolData = POOLDATA
  const userPool = new CognitoUserPool(poolData)

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

export function awsAuthenticate ({email, password}) {
  const poolData = POOLDATA
  // create user pool
  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new CognitoUser(userData)
  // user authentications
  const authenticationData = {
    // Username: '20160627test04@test.com',
    // Password: 'password'
    Username: email,
    Password: password
  }
  const authenticationDetails = new AuthenticationDetails(authenticationData)
  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        // console.log(result)
        const userAtt = recordUserAttributes(cognitoUser)
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
          userAtt: userAtt
        })
      },
      onFailure: err => reject(err)
    })
  )
}

function recordUserAttributes (cognitoUser) {
  cognitoUser.getUserAttributes((err, result) => {
    if (err) {
      console.log(err)
      return
    }
    for (let i = 0; i < result.length; i++) {
      console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue())
    }
    return result
  })
}
