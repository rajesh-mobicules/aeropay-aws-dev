import { iavCss } from './dev_configuration'

const awsProdBaseUrl = 'https://waas395lu9.execute-api.us-east-1.amazonaws.com/prod/'

export const aeroConfig = {
  creatMerchantURL: awsProdBaseUrl + 'createBusiness',
  addFundingUrl: awsProdBaseUrl + 'addBankAccount',
  refreshIavUrl: awsProdBaseUrl + 'iavTokenForMerchant',
  iavCss: iavCss,
  dwollaEnv: 'prod',
  microDeposits: false,
  fallbackToMicroDeposits: false
}

export const awsConfig = {
  UserPoolId: 'us-east-1_fWjpODvHX',
  ClientId: '4ho9ffdaapbhgpmdn43tasjtgj'
}
