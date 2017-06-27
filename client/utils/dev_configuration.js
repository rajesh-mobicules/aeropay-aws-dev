const awsDevBaseUrl = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/'
export const iavCss = 'https://staging-portal.aeropayments.com/iavcss/iav.css'
export const aeroConfig = {
  creatMerchantURL: awsDevBaseUrl + 'createBusiness',
  getTransactionURL: awsDevBaseUrl + 'transactionsForMerchant',
  addFundingURL: awsDevBaseUrl + 'addBankAccount',
  refreshIavURL: awsDevBaseUrl + 'iavTokenForMerchant',
  iavCss: iavCss,
  dwollaEnv: 'sandbox',
  microDeposits: false,
  fallbackToMicroDeposits: false
}

export const awsConfig = {
  UserPoolId: 'us-east-1_nhF9sTRVD',
  ClientId: '3drob3qfmheloo0790eobjgc5g'
}
