import { collection, doc, DocumentData, getDoc, getDocs, } from "firebase/firestore";
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

      const result = data as MenuDTO[];
      return result.sort((a:MenuDTO, b:MenuDTO) => a.position - b.position);

    } catch (error) {

      console.log("Error fetching from Firestore/ inside firebaseOps", error.message)

    }
    
    return null;
}

export async function getMenuById( itemId: string) {
    try {
        const docRef = doc(db, 'menu', itemId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as MenuDTO
            return data;
        } else {
          console.log("No such document (getMenuById)");
        }
    } catch(e) {
      console.log("Error fetching from Firestore/ inside firebaseOps", e);
    }
    return null;
  }