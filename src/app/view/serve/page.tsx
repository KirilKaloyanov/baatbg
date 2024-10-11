"use client";

import { useEffect } from "react";
import { db } from "../../../../firebaseConfig";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";

export default function Serve() {
  useEffect(() => {
    const fetchData = async () => {
      console.log("ha", db);

      try {
        // const myDocRef = doc(db, "posts", "RDLi9d2BWzcKrULpObeE");
        const querySnapshot = await getDocs(collection(db, 'posts'));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
        // const sshot = await getDoc(myDocRef);
        // if (sshot.exists()) {
        //   console.log("ss");
        // } else {
        //   console.log("noo");
        // }
        // console.log(sshot);
      } catch (error) {
        console.error("Error fetching document:", error);
      }

      // Initialize Firebase
      //firebase.initializeApp(firebaseConfig);

      // Get a reference to the Firestore database
      //const db = firebase.firestore();

      // Perform database operations
      // db.collection('users').get()
      //   .then((querySnapshot) => {
      //     // Process the data
      //   })
      //   .catch((error) => {
      //     console.error('Error getting documents: ', error);
      //   });

      // console.log(myDocRef)
      // console.log(db)
    };

    fetchData();
  }, []);

  return <h1>Hi</h1>;
}
