import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFlc6lHB2wERqre6Mo4sDhyAL_QnfTU38",
  authDomain: "apple-music-hi-res-album-eab62.firebaseapp.com",
  projectId: "apple-music-hi-res-album-eab62",
  storageBucket: "apple-music-hi-res-album-eab62.appspot.com",
  messagingSenderId: "1032337833616",
  appId: "1:1032337833616:web:a9c99280d0ef6eadb4e215",
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}
