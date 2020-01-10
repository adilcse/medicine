import * as firebase from "firebase";
import "firebase/auth";
var firebaseConfig = {
//paste firebase config here
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  export {db,firebase,storage as default};
