// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';


import { getFirestore, setLogLevel } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWmDho7AeyXNJXgY1tsu6twXh9sPg27qA",
  authDomain: "baatbgorg.firebaseapp.com",
  databaseURL: "https://baatbgorg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "baatbgorg",
  storageBucket: "baatbgorg.appspot.com",
  messagingSenderId: "173955335103",
  appId: "1:173955335103:web:2043ff36eaa0502236970a",
  measurementId: "G-L97SQVHZ2X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// setLogLevel('debug');


export { db };
export { auth };