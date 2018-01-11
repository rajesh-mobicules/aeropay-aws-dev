import fetch from 'node-fetch';

const sendSubscriptionToServer = (subscription) => {
  // This is where you'd update the subscription on the server.
  console.log("subscriptionToServer called");
  document.querySelector('.js-subscription').innerHTML = JSON.stringify(subscription.toJSON());

  let reqBody = {
    'type': 'SUBSCRIBE',
    'subscription_object': JSON.stringify(subscription.toJSON())
  }

  fetch('https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/pn/subscribe?merchantId=15',
    { method: 'POST', body: JSON.stringify(reqBody) })
    .then(function(res) {
      console.log(res.status);
    })
}

const removeSubscriptionFromServer = (subscription) => {
  // This is where you'd remove the subscription from the server.
  console.log('removeSubscriptionFromServer called: ' + JSON.stringify(subscription.toJSON()));

  let reqBody = {
    'type': 'UNSUBSCRIBE',
    'subscription_object': JSON.stringify(subscription.toJSON())
  }

  fetch('https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev/pn/unsubscribe',
    { method: 'POST', body: JSON.stringify(reqBody) })
    .then(function(res) {
      console.log(res.status);
    })
}


export default {
  sendSubscription: sendSubscriptionToServer,
  removeSubscription: removeSubscriptionFromServer
};
