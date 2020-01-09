import * as firebase from "firebase";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyDTZsKTmbcRjGwNF652wIdTv_rkiWkQZQQ",
  authDomain: "revive-medicine.firebaseapp.com",
  databaseURL: "https://revive-medicine.firebaseio.com",
  projectId: "revive-medicine",
  storageBucket: "revive-medicine.appspot.com",
  messagingSenderId: "605018565755",
  appId: "1:605018565755:web:326651baa13394719bc6de",
  measurementId: "G-GK6EMMGWE7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  export {db,firebase,storage as default};