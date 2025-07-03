export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,//"baatbgorg.firebaseapp.com", // need to be changed to the custom domain when connected to it
  //databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // "https://baatbgorg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, //"baatbgorg",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, //"baatbgorg.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, //"173955335103",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, //"1:173955335103:web:2043ff36eaa0502236970a",
  measurementId: "G-L97SQVHZ2X"
};
