const awsStagingBaseUrl = 'https://vwyvoq678a.execute-api.us-east-1.amazonaws.com/staging/'

export const aeroConfig = {
  creatMerchantURL: awsStagingBaseUrl + 'createBusiness',
  addFundingUrl: awsStagingBaseUrl + 'addBankAccount',
  refreshIavUrl: awsStagingBaseUrl + 'iavTokenForMerchant',
  iavCss: 'https://aeropay-demo.herokuapp.com/iavcss/iav.css',
  dwollaEnv: 'sandbox',
  microDeposits: false,
  fallbackToMicroDeposits: false
}

export const awsConfig = {
  UserPoolId: 'us-east-1_ndcMY47H8',
  ClientId: '1plv2dp67uc91ubgkt58gm5ahk'
}
