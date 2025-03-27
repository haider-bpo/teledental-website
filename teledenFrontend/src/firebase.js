import firebase from "firebase";
import "firebase/analytics";
import "firebase/messaging";
import { saveDevice } from "./Commons/apis/commonV1";

const firebaseConfig = {
  apiKey: "AIzaSyBEkgIxY5sr5INCs5rj1yhFP3Hn8znXPYA",
  authDomain: "teledental-876aa.firebaseapp.com",
  projectId: "teledental-876aa",
  storageBucket: "teledental-876aa.appspot.com",
  messagingSenderId: "666562237819",
  appId: "1:666562237819:web:d70e19b5a08339e8e659de",
  measurementId: "G-E0XY7NS2WS",
};
export const app = firebase.initializeApp(firebaseConfig);
export const analytics = firebase.analytics();
export const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

function generateToken() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  messaging
    ?.getToken({
      vapidKey:
        "BIk91SDYSZ_DzcTMNioSA77jq5trrN6N3jFM6tU-Ce61lGIlMVvXMNv4a6SHSw02OGgFvCqctvMQEC7PBfMyyuo",
    })
    .then(async (currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        await saveDevice({
          body: {
            deviceIdentifier: currentToken,
            deviceType: "web",
          },
        });
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
}
generateToken();
