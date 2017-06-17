const awsStagingBaseUrl = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/'

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
  UserPoolId: 'us-east-1_nhF9sTRVD',
  ClientId: '3drob3qfmheloo0790eobjgc5g'
}
