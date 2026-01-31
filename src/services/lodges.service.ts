import { getCollection, getDocument, getDocumentByFieldValue } from "./dbService";
import { LodgeExtendedDTO } from "@/interfaces/LodgeExtendedDTO";

export async function getAllLodges() {

  try {
    const lodgesSnapshot = await getCollection('lodges');
    const lodges = lodgesSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as LodgeExtendedDTO;
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

      return { id: data.id, ...data.data() } as LodgeExtendedDTO;
      
    } else {
      console.log("No such document from (getLodgeById)");
    }
    
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function getLodgesByRegionId(regionId: string) {
  try {
    const querySnapshot = await getDocumentByFieldValue('lodges', 'regionId', regionId);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as LodgeExtendedDTO);

  } catch (err) {
    console.error("Error fetching from Firestore/ inside getLodgesByRegionId", err);
  }
}

export async function getLodgesByMemberId(memberId: string) {
  try {
    const querySnapshot = await getDocumentByFieldValue('lodges', 'memberId', memberId);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as LodgeExtendedDTO);

  } catch (err) {
    console.error("Error fetching from Firestore/ inside getLodgesByMemberId", err);
  }
}
