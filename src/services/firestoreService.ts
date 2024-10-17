import { doc, getDoc, addDoc, updateDoc, collection, getDocs } from "@firebase/firestore";
import { db } from "../../firebaseConfig"


export async function getContentById(itemId: string) {
    try {

        const docRef = doc(db, "posts", itemId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            console.log("No such document")
        }
    } catch(e) {
        console.log("Error fetching from Firestore/ inside firebaseOps", e);
    }
  }

  export async function getCollection(name: string) {
    try {
        const querySnapshot = await getDocs(collection(db, name));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content
        }))
        return data;
      } catch (error) {
        console.log("Error fetching from Firestore/ inside firebaseOps", error)
      }
      return null;
  }
  
  export async function saveNewContent (content) {
    try {
      const docRef = await addDoc(collection(db, "posts"), { content });
    } catch (e) {
      console.log('firestore create error', e)
    }
  };

  export async function updateContent(itemId, content) {
    try {
        const docRef = doc(db, 'posts', itemId);
        await updateDoc(docRef, { content })
    } catch (e) {
      console.log('firestore update error', e)
    }
  }