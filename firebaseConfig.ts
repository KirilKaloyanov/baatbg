// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "baatbgorg.firebaseapp.com",
  databaseURL:
    "https://baatbgorg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "baatbgorg",
  storageBucket: "baatbgorg.appspot.com",
  messagingSenderId: "173955335103",
  appId: "1:173955335103:web:2043ff36eaa0502236970a",
  measurementId: "G-L97SQVHZ2X",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
