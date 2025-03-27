// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBEkgIxY5sr5INCs5rj1yhFP3Hn8znXPYA",
  authDomain: "teledental-876aa.firebaseapp.com",
  projectId: "teledental-876aa",
  storageBucket: "teledental-876aa.appspot.com",
  messagingSenderId: "666562237819",
  appId: "1:666562237819:web:d70e19b5a08339e8e659de",
  measurementId: "G-E0XY7NS2WS",
};
firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
// console.log(
//   "[firebase-messaging-sw.js] Received background message ",
//   payload
// );
// Customize notification here
// const notificationTitle = "Background Message Title";
// const notificationOptions = {
//   body: "Background Message body.",
//   icon: "/firebase-logo.png",
// };

// self.registration.showNotification(notificationTitle, notificationOptions);
// });
