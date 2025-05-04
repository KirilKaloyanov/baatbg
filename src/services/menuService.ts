import { collection, getDocs, } from "firebase/firestore";
import { db } from "@firebaseConfig"
import { MenuDTO } from "@/interfaces/admin/MenuDTO";

export async function getMenuItems() {

  try {
    const querySnapshot = await getDocs(collection(db, 'menu'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
        // data: doc.data()
      }))
      return data as MenuDTO[];
    } catch (error) {
      console.log("Error fetching from Firestore/ inside firebaseOps", error.message)
    }
    return null;
}

