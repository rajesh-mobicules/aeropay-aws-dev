const awsProdBaseUrl = 'https://waas395lu9.execute-api.us-east-1.amazonaws.com/prod/'

export const aeroConfig = {
  creatMerchantURL: awsProdBaseUrl + 'createBusiness',
  addFundingUrl: awsProdBaseUrl + 'addBankAccount',
  refreshIavUrl: awsProdBaseUrl + 'iavTokenForMerchant',
  iavCss: 'https://aeropay-demo.herokuapp.com/iavcss/iav.css',
  dwollaEnv: 'prod',
  microDeposits: false,
  fallbackToMicroDeposits: false
}

export const awsConfig = {
  UserPoolId: 'us-east-1_fWjpODvHX',
  ClientId: '7sj44o6sb3hsg806r4fgj5hnau'
}
