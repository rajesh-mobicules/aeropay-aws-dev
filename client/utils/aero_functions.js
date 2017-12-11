import axios from 'axios'
import { aeroConfig } from './configuration'
// import { parsePJString } from 'utils/auth_utils'

// const config = {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }

function apiWithParam(apiClient, queryParams, path, method, body, addParams) {
  const additionalParams = {
    queryParams: queryParams
  }
  if (addParams) {
    for (let key in addParams) {
      if (addParams.hasOwnProperty(key)) {
        additionalParams.queryParams.key = addParams.key
      }
    }
  }
  return apiClient.invokeApi({}, path, method.toUpperCase(), additionalParams, body)
}

export function registerMerchant(apiClient, formData) {
  return apiWithParam(apiClient, {}, 'createBusiness', 'POST', formData)
  // const config = {
  //   headers: {
  //     'requestAuthorization': idToken,
  //     'Content-Type': 'application/json'
  //   }
  // }
  // return new Promise((resolve, reject) => {
  //   axios.post(aeroConfig.createBusiness, formData, config)
  //     .then(res => {
  //       console.log(res)
  //       if ('error' in res.data) {
  //         reject(res.data)
  //       } else {
  //         resolve(res.data)
  //       }
  //     })
  //     .catch(error => {
  //       reject(error)
  //     })
  // })
}

export function dwollaIav(apiClient, iavToken, SET_FUNDING_SOURCE, toggleButton) {
  const dwolla = window.dwolla
  // var iavToken = 'bL5MU6FIRmZ8XEuQmYXjaxYMqf8mbfFrecvch4dYQttRUIwikA'
  dwolla.configure(aeroConfig.dwollaEnv)
  dwolla.iav.start(iavToken, {
    container: 'iavContainer',
    stylesheets: [
      // 'https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
      aeroConfig.iavCss
    ],
    microDeposits: aeroConfig.microDeposits,
    fallbackToMicroDeposits: aeroConfig.fallbackToMicroDeposits,
    subscriber: ({ currentPage, error }) => {
      // console.log('currentPage:', currentPage, 'error:', JSON.stringify(error))
    }
  }, function (err, res) {
    console.log(iavToken)
    console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res))
    if (res) {
      if ('_links' in res) {
        var links = res['_links']
        if ('funding-source' in links) {
          var fundingSource = links['funding-source']
          if ('href' in fundingSource) {
            var href = fundingSource['href']
            var hArray = href.split('/')
            var fundingSourceId = hArray[hArray.length - 1]
            const aeroPayUrl = 'aeropay://fundingSource/' + fundingSourceId
            SET_FUNDING_SOURCE(fundingSourceId)
            console.log(aeroPayUrl)
            addFundingSource(apiClient, fundingSourceId)
              .then(({data}) => {
                console.log(data)
                toggleButton(true)
              })
              .catch(error => console.log(error))
            // window.location.href = aeroPayUrl
          }
        }
      }
    }
  })
}

function addFundingSource(apiClient, fundingSource) {
  const data = { fundingSourceId: fundingSource }

  return apiWithParam(apiClient, {}, 'addBankAccount', 'POST', data)
}

export function uploadFile(apiClient, merchantId, base64file, fileType) {
  // const config = {
  //   headers: {
  //     'requestAuthorization': idToken,
  //     'Content-Type': 'application/json'
  //   }
  // }
  // const data = { document: base64file, type: fileType }
  // return new Promise((resolve, reject) => {
  //   axios.post(aeroConfig.uploadDocumentForMerchant, data, config)
  //     .then(res => {
  //       if (res.data.success === true) resolve('successly upload file!')
  //       else reject(res.data.error)
  //     })
  //     .catch(err => reject(err))
  // })
  const body = {
    document: base64file,
    type: fileType
  }
  return apiWithParam(apiClient, {merchantId}, 'uploadDocumentForMerchant', 'POST', body)
}

export function uploadSsn(apiClient, ssn) {
  // const config = {
  //   headers: {
  //     'requestAuthorization': idToken,
  //     'Content-Type': 'application/json'
  //   }
  // }
  const data = { ssn: ssn }
  return apiWithParam(apiClient, {}, 'retryCreateBusiness', 'POST', data)
  // return new Promise((resolve, reject) => {
  //   axios.post(aeroConfig.retryCreateBusiness, data, config)
  //     .then(res => {
  //       if (res.data.success === true) resolve('successly submit ssn!')
  //       else reject(res.data.error)
  //     })
  //     .catch(err => reject(err))
  // })
}

export function refreshIav(apiClient) {
  // const config = {
  //   headers: {
  //     'requestAuthorization': idToken,
  //     'Content-Type': 'application/json'
  //   }
  // }
  // console.log(idToken)
  // return new Promise((resolve, reject) => {
  //   axios.get(aeroConfig.iavTokenForMerchant, config)
  //     .then(res => {
  //       console.log(res)
  //       if (res.data !== null && typeof res.data === 'object' && 'iavToken' in res.data) {
  //         resolve(res.data.iavToken)
  //       } else {
  //         reject(res.data.message ? res.data.message : '')
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       reject(err)
  //     })
  // })
  return apiWithParam(apiClient, {}, 'iavTokenForMerchant', 'GET');
}

export function getLocations(apiClient, merchantId) {
  return apiWithParam(apiClient, {merchantId}, 'locationsForMerchant', 'GET')
}

export function createLocation(apiClient, merchantId, location) {
  return apiWithParam(apiClient, {merchantId}, 'locationForMerchant', 'POST', location)
}

export function deleteLocation(apiClient, merchantLocationId) {
  return apiWithParam(apiClient, {merchantLocationId}, 'locationForMerchant', 'DELETE')
}

export function saveLocation(apiClient, location, merchantLocationId) {
  return apiWithParam(apiClient, {merchantLocationId}, 'locationForMerchant', 'PUT', location)
}

export function getTransacations(apiClient, merchantId) {
  // const pathTemplate = 'sls/searchTransactionsForMerchant'
  // const method = 'GET'
  // const additionalParams = {
  //   queryParams: {
  //     keyword: ''
  //   }
  // }
  // return new Promise((resolve, reject) => {
  //   apiClient.invokeApi({}, pathTemplate, method, additionalParams)
  //     .then(function (res) {
  //       let data = res.data
  //       try {
  //         resolve(data.transactions)
  //       } catch (err) {
  //         reject(data.message)
  //       }
  //       // Add success callback code here.
  //     })
  //     .catch(function (err) {
  //       reject(err)
  //       // Add error callback code here.
  //     })
  // })
  return apiWithParam(apiClient, {merchantId}, 'searchTransactionsForMerchant', 'GET')
}

export function getProfile(apigClient, email) {
  const pathTemplate = 'profileForMerchant'
  const method = 'GET'
  const additionalParams = {
    queryParams: {
      email: email
    }
  }
  return apigClient.invokeApi({}, pathTemplate, method, additionalParams)
}

export function getBillings(apiClient, merchantId) {
  return apiWithParam(apiClient, {merchantId}, 'bankAccountForMerchant', 'GET')
}

export function getTransactionSummary(idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(aeroConfig.userTransactionSummaryForMerchant, config)
      .then(res => {
        const data = res.data
        try {
          resolve(data.transactions)
        } catch (err) {
          reject(data.error)
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function getTrasactionsByCondition(keyword, dateRange, page, limit) {
  let url;
  const pageLimit = `&page=${page}&limit=${limit}`
  if (dateRange !== null && dateRange.includes("to")) {
    const dates = dateRange.split("to")
    const from = dates[0].trim()
    const to = dates[1].trim()
    url = `${aeroConfig.searchTransactionsForMerchant}?keyword=${keyword}&dateFrom=${from}&dateTo=${to}`
  } else {
    url = `${aeroConfig.searchTransactionsForMerchant}?keyword=${keyword}`
  }
  url += pageLimit
  return axios.get(url)
    .then(res => res.data.transactions)
    .catch(err => err)
}
