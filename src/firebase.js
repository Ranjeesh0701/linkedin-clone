import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkmn0PlIaw_z2E0ohZA493NWDUzepdsc0",
  authDomain: "linkedin-clone-18b4a.firebaseapp.com",
  projectId: "linkedin-clone-18b4a",
  storageBucket: "linkedin-clone-18b4a.appspot.com",
  messagingSenderId: "203140262944",
  appId: "1:203140262944:web:c192d01baa01fb5975a045",
};

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();

export { db, auth };
