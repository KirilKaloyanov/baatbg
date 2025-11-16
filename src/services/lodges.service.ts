import { getCollection, getDocument } from "./dbService";
import { LodgeDTO } from "@/interfaces/LodgeDTO";

export async function getAllLodges() {

  try {
    const lodgesSnapshot = await getCollection('lodges');
    const lodges = lodgesSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as LodgeDTO;
    });

    return lodges;

  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function getLodgeById(id: string) {

  try {    
    const data = await getDocument("lodges", id);
    
    if (data.exists()) {

      return { id: data.id, ...data.data() } as LodgeDTO;
      
    } else {
      console.log("No such document from (getLodgeById)");
    }
    
  } catch (err) {
    console.error(err);
  }
  return null;
}
