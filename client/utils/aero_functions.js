import axios from 'axios'
import { aeroConfig } from './configuration'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export function registerMerchant (formData, idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  // console.log(config)
  // const creatMerchantURL = 'http://merchant-dev.us-east-1.elasticbeanstalk.com/createBusiness'
  return new Promise((resolve, reject) => {
    axios.post(aeroConfig.creatMerchantURL, formData, config)
      .then(res => {
        // console.log(res)
        if ('error' in res.data) {
          reject(res.data)
        } else {
          resolve(res.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function dwollaIav (iavToken, SET_FUNDING_SOURCE, SET_IAV_BUTTON, idToken) {
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
            SET_IAV_BUTTON(true)
            console.log(aeroPayUrl)
            addFundingSource(fundingSourceId, idToken)
              .then(res => console.log(res))
              .catch(error => console.log(error))
            // window.location.href = aeroPayUrl
          }
        }
      }
    }
  })
}

function addFundingSource (fundingSource, idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  const data = { fundingSourceId: fundingSource }

  return new Promise((resolve, reject) => {
    axios.post(aeroConfig.addFundingURL, data, config)
      .then(res => {
        if (res.data.error === null) resolve('successly added funding source')
        else reject(res.data.error)
      })
      .catch(err => reject(err))
  })
}

export function uploadFile (base64file, fileType, idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  const data = { document: base64file, type: fileType }
  return new Promise((resolve, reject) => {
    axios.post(aeroConfig.uploadDocumentForMerchant, data, config)
      .then(res => {
        if (res.data.success === true) resolve('successly upload file!')
        else reject(res.data.error)
      })
      .catch(err => reject(err))
  })
}

export function uploadSsn (ssn, idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  const data = { ssn: ssn }
  return new Promise((resolve, reject) => {
    axios.post(aeroConfig.retryCreateBusiness, data, config)
      .then(res => {
        if (res.data.success === true) resolve('successly submit ssn!')
        else reject(res.data.error)
      })
      .catch(err => reject(err))
  })
}

export function refreshIav (idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  console.log(idToken)
  return new Promise((resolve, reject) => {
    axios.get(aeroConfig.refreshIavURL, config)
      .then(res => {
        console.log(res)
        if (res.data !== null && typeof res.data === 'object' && 'iavToken' in res.data) {
          resolve(res.data.iavToken)
        } else {
          reject(res.data.message ? res.data.message : '')
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function getLocations () {
  return new Promise((resolve, reject) => {
    axios.get(aeroConfig.locationsForMerchant, config)
      .then(res => {
        const data = res.data
        try {
          resolve(data.locations)
        } catch (err) {
          reject(data.message)
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function createLocation (location) {
  return new Promise((resolve, reject) => {
    axios.post(aeroConfig.locationForMerchant, location, config)
      .then(res => resolve(JSON.parse(res.data.location.replace(/'/g, '"'))))
      .catch(err => reject(err))
  })
}

export function deleteLocation (merchantLocationId) {
  return new Promise((resolve, reject) => {
    axios.delete(aeroConfig.locationForMerchant + '?merchantLocationId=' + merchantLocationId)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function saveLocation (location, merchantLocationId) {
  return new Promise((resolve, reject) => {
    axios.put(aeroConfig.locationForMerchant + '?merchantLocationId=' + merchantLocationId, location)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export function getTransacations () {
  return new Promise((resolve, reject) => {
    axios.get(aeroConfig.getTransactionURL)
      .then(res => {
        const data = res.data
        try {
          resolve(data.transactions)
        } catch (err) {
          reject(data.message)
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function getProfile (idToken) {
  // const config = {
  //   headers: {
  //     'requestAuthorization': idToken
  //   }
  // }
  return new Promise((resolve, reject) => {
    axios.get(aeroConfig.profileForMerchant)
      .then(res => {
        const data = res.data
        if (data.success) resolve(data.merchant)
        else reject(data.message)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function getBillings (idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(aeroConfig.bankAccountForMerchant, config)
      .then(res => {
        const data = res.data
        try {
          resolve(data.bankAccount)
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

export function getTransactionSummary (idToken) {
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

export function getTrasactionsByCondition (keyword, dateRange) {
  let data = {
    keyword: keyword
  }
  if (dateRange !== null && dateRange.includes("to")) {
    const dates = dateRange.split("to")
    const from = dates[0].trim()
    const to = dates[1].trim()
    data.dates = {
      from: from,
      to: to
    }
  }
  return axios.post(aeroConfig.searchTransactionsForMerchant, data, config)
    .then(res => res.data.transactions)
    .catch(err => err)
}
