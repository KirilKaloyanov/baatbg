import { getCollection, getDocument } from "./dbService";
import { RegionDTO } from "@/interfaces/RegionDTO";

export async function getAllRegions() {

  try {
    const regionsSnapshot = await getCollection('regions');
    const regions = regionsSnapshot.docs.map((doc) => {

      return {
        id: doc.id,
        ...doc.data(),
      } as RegionDTO;

    });

    return regions;

  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function getRegionById(id: string) {

  try {    
    const data = await getDocument("regions", id);
    
    if (data.exists()) {

      return { id: data.id, ...data.data() } as RegionDTO;
      
    } else {
      console.log("No such document from (getRegionById)");
    }
    
  } catch (err) {
    console.error(err);
  }
  return null;
}
