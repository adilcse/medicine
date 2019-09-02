import * as firebase from "firebase";
import "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyAuCg2E3sWkzwwmAT-3W7iu5RNN-C0r87U",
    authDomain: "med-life.firebaseapp.com",
    databaseURL: "https://med-life.firebaseio.com",
    projectId: "med-life",
    storageBucket: "gs://med-life.appspot.com/",
    messagingSenderId: "799069840222",
    appId: "1:799069840222:web:0957d160b3d30bb8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  export {db,firebase,storage as default};