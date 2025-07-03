import { getCollection, getDocument } from "./dbService";
import { MenuDTO } from "@/interfaces/admin/MenuDTO";

export async function getMenuItems() {

  try {
    const querySnapshot = await getCollection('menu');

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
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
        const docSnap = await getDocument('menu', itemId);
        if (docSnap.exists()) {
          const data = docSnap.data() as MenuDTO
            return data;
        } else {
          console.log("No such document (getMenuById)");
        }
    } catch(e) {
      console.log("Error fetching from Firestore/ inside (getMenuById)", e);
    }
    return null;
  }