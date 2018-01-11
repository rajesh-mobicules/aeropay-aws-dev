// self.addEventListener('push', function(event) {
//   let push_message = event.data.json();
//   console.log('push received', push_message);
//   broadcastToClients(push_message);
// });
//
// function broadcastToClients(message) {
//   self.clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function(clientList){
//     console.log(clientList);
//     clientList.forEach(function(client) {
//       client.postMessage({
//         msg: message,
//       });
//     });
//   });
// }
//
// self.addEventListener('pushsubscriptionchange', (event) => {
//   console.log("event :" + event);
//   const options = event.oldSubscription.options;
//   // Fetch options if they do not exist in the event.
//   event.waitUntil(
//     self.registration.pushManager.subscribe(options)
//       .then((subscription) => { // eslint-disable-line no-unused-vars
//         // Send new subscription to application server.
//       }),
//   );
// });
