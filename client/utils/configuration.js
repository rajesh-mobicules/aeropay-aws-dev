const awsDevBaseUrl = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/'

const awsProdBaseUrl = 'https://waas395lu9.execute-api.us-east-1.amazonaws.com/prod/'

const awsStagingBaseUrl = 'https://vwyvoq678a.execute-api.us-east-1.amazonaws.com/staging/'

export const awsRegion = 'us-east-1'

const awsDevConfig = {
  UserPoolId: 'us-east-1_nhF9sTRVD',
  ClientId: '3drob3qfmheloo0790eobjgc5g',
  // ClientId: 'nph6nt7s3rv59agqbdd01qrh8',
  IdentityPoolId: 'us-east-1:53a53b4e-f09c-48ed-b8d2-a9927d0e9c8f',
  LoginsId: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_nhF9sTRVD'
}

const awsStagingConfig = {
  UserPoolId: 'us-east-1_ndcMY47H8',
  ClientId: '1plv2dp67uc91ubgkt58gm5ahk',
  // ClientId: '6l5otmd64vbagginhmj8kn8sji',
  IdentityPoolId: 'us-east-1:de663d17-7b05-4949-a08a-ff2d1bb9b387',
  LoginsId: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_ndcMY47H8'
}

const awsProdConfig = {
  UserPoolId: 'us-east-1_fWjpODvHX',
  ClientId: '4ho9ffdaapbhgpmdn43tasjtgj',
  IdentityPoolId: 'us-east-1:65218d2b-2b7e-4c89-b63a-f7bbac76a0b1',
  LoginsId: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_fWjpODvHX'
}

let awsBaseUrl
let awsConfig
let searchTransUrl
const stage = process.env.STAGE
console.log(stage)
let dwollaEnv = 'sandbox'
if (stage === 'dev') {
  awsBaseUrl = awsDevBaseUrl
  awsConfig = awsDevConfig
  searchTransUrl = 'searchTransactionsForMerchant'
} else if (stage === 'staging') {
  awsBaseUrl = awsStagingBaseUrl
  awsConfig = awsStagingConfig
  searchTransUrl = 'searchTransactionsForMerchant'
} else {
  awsBaseUrl = awsProdBaseUrl
  awsConfig = awsProdConfig
  dwollaEnv = 'prod'
  searchTransUrl = 'searchTransactionsForMerchant'
}

export { awsConfig, awsBaseUrl }
// awsBaseUrl = '/dev/'
export const iavCss = 'https://portal.aeropayments.com/iavcss/iav.css'

export const aeroConfig = {
  createBusiness: awsBaseUrl + 'createBusiness',
  getTransactionURL: awsBaseUrl + 'transactionsForMerchant',
  addBankAccount: awsBaseUrl + 'addBankAccount',
  iavTokenForMerchant: awsBaseUrl + 'iavTokenForMerchant',
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
  searchTransactionsForMerchant: searchTransUrl
}

export const documentUploadURL = awsBaseUrl + 'uploadDocumentForMerchant'
