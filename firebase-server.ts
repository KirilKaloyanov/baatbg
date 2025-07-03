import { getApp, getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

import { getFirestore, setLogLevel } from "firebase/firestore";

//const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const db = getFirestore(app);

// setLogLevel('debug');

// export { db };

import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
}

const databaseURL = "https://baatbgorg-default-rtdb.europe-west1.firebasedatabase.app";

export function getFirebaseAdmin(){
    console.log(!admin.apps.length)
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL
        })
    }

    return admin;
}

const firebaseAdmin = getFirebaseAdmin();

const db = firebaseAdmin.firestore();

export { firebaseAdmin, db }
