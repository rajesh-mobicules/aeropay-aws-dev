const awsDevBaseUrl = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/'

const awsProdBaseUrl = 'https://waas395lu9.execute-api.us-east-1.amazonaws.com/prod/'

const awsStagingBaseUrl = 'https://vwyvoq678a.execute-api.us-east-1.amazonaws.com/staging/'

const awsDevConfig = {
  UserPoolId: 'us-east-1_nhF9sTRVD',
  ClientId: '3drob3qfmheloo0790eobjgc5g',
  IdentityPoolId: 'us-east-1:53a53b4e-f09c-48ed-b8d2-a9927d0e9c8f'
}

const awsStagingConfig = {
  UserPoolId: 'us-east-1_ndcMY47H8',
  ClientId: '1plv2dp67uc91ubgkt58gm5ahk',
  IdentityPoolId: ''
}

const awsProdConfig = {
  UserPoolId: 'us-east-1_fWjpODvHX',
  ClientId: '4ho9ffdaapbhgpmdn43tasjtgj',
  IdentityPoolId: ''
}

let awsBaseUrl
let awsConfig
const stage = process.env.STAGE
console.log(stage)
let dwollaEnv = 'sandbox'
if (stage === 'dev') {
  awsBaseUrl = awsDevBaseUrl
  awsConfig = awsDevConfig
} else if (stage === 'staging') {
  awsBaseUrl = awsStagingBaseUrl
  awsConfig = awsStagingConfig
} else {
  awsBaseUrl = awsProdBaseUrl
  awsConfig = awsProdConfig
  dwollaEnv = 'prod'
}

export { awsConfig, awsBaseUrl }
// awsBaseUrl = '/dev/'
export const iavCss = 'https://portal.aeropayments.com/iavcss/iav.css'

export const aeroConfig = {
  creatMerchantURL: awsBaseUrl + 'createBusiness',
  getTransactionURL: awsBaseUrl + 'transactionsForMerchant',
  addFundingURL: awsBaseUrl + 'addBankAccount',
  refreshIavURL: awsBaseUrl + 'iavTokenForMerchant',
  iavCss: iavCss,
  dwollaEnv: dwollaEnv,
  microDeposits: true,
  fallbackToMicroDeposits: true,
  profileForMerchant: awsBaseUrl + 'profileForMerchant',
  locationsForMerchant: awsBaseUrl + 'locationsForMerchant',
  bankAccountForMerchant: awsBaseUrl + 'bankAccountForMerchant',
  userTransactionSummaryForMerchant: awsBaseUrl + 'userTransactionSummaryForMerchant',
  uploadDocumentForMerchant: awsBaseUrl + 'uploadDocumentForMerchant',
  retryCreateBusiness: awsBaseUrl + 'retryCreateBusiness',
  locationForMerchant: awsBaseUrl + 'locationForMerchant',
  searchTransactionsForMerchant: awsBaseUrl + 'sls/searchTransactionsForMerchant'
}

export const documentUploadURL = awsBaseUrl + 'uploadDocumentForMerchant'
