import { iavCss } from './dev_configuration'

const awsStagingBaseUrl = 'https://vwyvoq678a.execute-api.us-east-1.amazonaws.com/staging/'

export const aeroConfig = {
  creatMerchantURL: awsStagingBaseUrl + 'createBusiness',
  addFundingURL: awsStagingBaseUrl + 'addBankAccount',
  getTransactionURL: awsStagingBaseUrl + 'transactionsForMerchant',
  refreshIavURL: awsStagingBaseUrl + 'iavTokenForMerchant',
  iavCss: iavCss,
  dwollaEnv: 'sandbox',
  microDeposits: false,
  fallbackToMicroDeposits: false,
  profileForMerchant: awsStagingBaseUrl + 'profileForMerchant',
  locationsForMerchant: awsStagingBaseUrl + 'locationsForMerchant',
  bankAccountForMerchant: awsStagingBaseUrl + 'bankAccountForMerchant'
}

export const awsConfig = {
  UserPoolId: 'us-east-1_ndcMY47H8',
  ClientId: '1plv2dp67uc91ubgkt58gm5ahk'
}
