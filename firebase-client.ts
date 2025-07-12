// "use client";

import { initializeApp, getApp, getApps } from "firebase/app";
// import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";



const app = initializeApp(firebaseConfig);// getApps().length ? getApp() :

// const storage = getStorage(app); // , "gs://baatbgorg.firebasestorage.app"
const db = getFirestore(app);

export { 
    db, 
    // storage 
};