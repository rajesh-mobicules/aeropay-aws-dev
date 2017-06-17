import axios from 'axios'

export function registerMerchant (formData, idToken) {
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  // console.log(config)
  const creatMerchantURL = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/createBusiness'
  // const creatMerchantURL = 'http://merchant-dev.us-east-1.elasticbeanstalk.com/createBusiness'
  return new Promise((resolve, reject) => {
    axios.post(creatMerchantURL, formData, config)
      .then(res => {
        console.log(res)
        // if (res.data.error === null || res.data.error === '') {
        resolve(res.data)
        // } else {
        //   reject(res.data)
        // }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function dwollaIav (iavToken, SET_FUNDING_SOURCE, SET_IAV_BUTTON, idToken) {
  const dwolla = window.dwolla
  // var iavToken = 'bL5MU6FIRmZ8XEuQmYXjaxYMqf8mbfFrecvch4dYQttRUIwikA'
  dwolla.configure('sandbox')
  dwolla.iav.start(iavToken, {
    container: 'iavContainer',
    stylesheets: [
      'http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
      'https://aeropay-demo.herokuapp.com/iavcss/iav.css'
    ],
    microDeposits: false,
    fallbackToMicroDeposits: false,
    subscriber: ({ currentPage, error }) => {
      // console.log('currentPage:', currentPage, 'error:', JSON.stringify(error))
    }
  }, function (err, res) {
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
  const data = {fundingSourceId: fundingSource}
  const url = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/addBankAccount'
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(res => {
        if (res.data.error === null) resolve('successly added funding source')
        else reject(res.data.error)
      })
      .catch(err => reject(err))
  })
}

export function refreshIav (idToken) {
  const url = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/iavTokenForMerchant'
  const config = {
    headers: {
      'requestAuthorization': idToken,
      'Content-Type': 'application/json'
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(url, config)
      .then(res => {
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
