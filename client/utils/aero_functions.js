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
      .then(iavToken => resolve(iavToken))
      .catch(err => reject(err))
  })
}
