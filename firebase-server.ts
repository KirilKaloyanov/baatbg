import { getApp, getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

import { getFirestore, setLogLevel } from "firebase/firestore";

//const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const db = getFirestore(app);

// setLogLevel('debug');

// export { db };

import admin, { ServiceAccount } from "firebase-admin";
console.log("process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')",process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'))
console.log("FIREBASE_PRIVATE_KEY", typeof process.env.FIREBASE_PRIVATE_KEY)
console.log('NEXT_PUBLIC_FIREBASE_API_KEY', typeof  process.env.NEXT_PUBLIC_FIREBASE_API_KEY, process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log('NEXT_PUBLIC_FIREBASE_DATABASE_URL', typeof  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL)


const serviceAccount: ServiceAccount = {
    projectId: "baatbgorg",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
const storage = firebaseAdmin.storage();

export { firebaseAdmin, db, storage }
