import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKmNcNmIhxBTiV0zXmNMo3qSnr3OSZ3V4",
  authDomain: "apple-music-hi-res-album-db.firebaseapp.com",
  projectId: "apple-music-hi-res-album-db",
  storageBucket: "apple-music-hi-res-album-db.appspot.com",
  messagingSenderId: "630030760466",
  appId: "1:630030760466:web:c3efe9c2d9662e19bff6cb",
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}
