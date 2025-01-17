import { collection, getDocs, } from "@firebase/firestore";
import { db } from "@firebaseConfig"

export async function getMenuItems() {
  try {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      return data;
    } catch (error) {
      console.log("Error fetching from Firestore/ inside firebaseOps", error)
    }
    return null;
}

