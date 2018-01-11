import mitt from 'mitt';
import sub from './subscribe';

const emitter = mitt();
const SUPPORTED = 'supported';
const ERROR = 'error';
const SUBSCRIBED = 'subscribed';
const UNSUBSCRIBED = 'unsubscribed';
const READY = 'ready'
let isReady = false;

function buildApplicationServerKey() {
  const base64 = 'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90=';
  const rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
  const characters = atob(rfc4648).split('').map(character => character.charCodeAt(0));
  return new Uint8Array(characters);
}

const registerServiceWorker = function () {
  if ('serviceWorker' in navigator) {
    // Unless you change the URL of the service worker script,
    // `navigator.serviceWorker.register()` is effectively a no-op during subsequent visits.
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        initializeState();
        console.log('ServiceWorker registration successful.', registration);
      }).catch((error) => {
      console.error('ServiceWorker registration failed.', error);
    });
  } else {
    console.log('Service workers aren’t supported in this browser.');
  }
};

const initializeState = function () {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.error('Notifications aren’t supported.');
    return;
  }

  // If the current notification permission is denied,
  // it's a permanent block until the user changes the permission
  if (Notification.permission === 'denied') {
    console.error('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.error('Push messaging isn’t supported.');
    return;
  }

  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.getSubscription()
      .then((subscription) => {
        emitter.emit(SUPPORTED);
        console.log(subscription);
        // Do we already have a push message subscription?
        if (subscription) {
          console.log('Already Subscribed');
          emitter.emit(SUBSCRIBED);
        }
        else {
          subscribe();
        }
        emitter.emit(READY);
      })
      .catch((error) => {
        console.error('Error during getSubscription()', error);
      });
  });
};

const subscribe = function () {
  function permissionDenied() {
    emitter.emit(ERROR, 'Permission Denied?');
    unsubscribe();
  }
  function permissionGranted() {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: buildApplicationServerKey(),
      })
        .then((subscription) => {
          sub.sendSubscription(subscription);
          emitter.emit(SUBSCRIBED);
        })
        .catch((error) => {
          console.error('Unable to subscribe to messaging server.', error);
          emitter.emit(ERROR, 'Unable to subscribe to messaging server.',
          );
        });
    });
  }
  if (Notification.permission === 'denied') {
    permissionDenied();
    return;
  }
  if (Notification.permission === 'default') {
    Notification.requestPermission().then((result) => {
      if (result !== 'granted') {
        permissionDenied();
        return;
      }
      permissionGranted();
    });
    return;
  }
  permissionGranted();
};

const unsubscribe = function () {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.getSubscription()
      .then((subscription) => {
        if (!subscription) {
          emitter.emit(UNSUBSCRIBED);
          return;
        }
        subscription.unsubscribe().then(() => {
          emitter.emit(UNSUBSCRIBED);
        }).catch((error) => {
          console.error('Unable to unsubscribe to messaging server.', error);
          emitter.emit(ERROR,
            'Unable to unsubscribe to messaging server.',
          );
        });
        sub.removeSubscription(subscription);
      })
      .catch((error) => {
        console.error('Error during getSubscription()', error);
      });
  });
};

export default {
  init: registerServiceWorker,
  on: emitter.on,
  SUPPORTED,
  ERROR,
  SUBSCRIBED,
  UNSUBSCRIBED,
  subscribe,
  unsubscribe,
  READY
};
