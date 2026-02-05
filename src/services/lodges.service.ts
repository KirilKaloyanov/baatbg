import { getCollection, getDocument, getDocumentByFieldValue } from "./dbService";
import { LodgeBaseDTO, LodgeDetailsDTO } from "@/interfaces/LodgeDTO";
import { mapFirestoreDocs } from "@/utils/firestoreUtils";
import { COLLECTIONS } from "@/constants/collections";

export async function getAllLodges(): Promise<LodgeBaseDTO[] | null> {
  try {
    const lodgesSnapshot = await getCollection(COLLECTIONS.LODGES);
    return mapFirestoreDocs<LodgeBaseDTO>(lodgesSnapshot.docs);
  } catch (err) {
    console.error("[LodgesService] Error fetching all lodges:", err);
    throw err;
  }
}

export async function getLodgeById(id: string): Promise<LodgeDetailsDTO | null> {
  try {
    const data = await getDocument(COLLECTIONS.LODGES, id);
    if (data.exists()) {
      return { id: data.id, ...data.data() } as LodgeDetailsDTO;
    }
    console.warn("[LodgesService] Lodge not found:", id);
    return null;
  } catch (err) {
    console.error("[LodgesService] Error fetching lodge by ID:", err);
    throw err;
  }
}

export async function getLodgesByRegionId(regionId: string): Promise<LodgeBaseDTO[] | null> {
  try {
    const querySnapshot = await getDocumentByFieldValue(COLLECTIONS.LODGES, "regionId", regionId);
    return mapFirestoreDocs<LodgeBaseDTO>(querySnapshot.docs);
  } catch (err) {
    console.error("[LodgesService] Error fetching lodges by region ID:", err);
    throw err;
  }
}

export async function getLodgesByMemberId(memberId: string): Promise<LodgeBaseDTO[] | null> {
  try {
    const querySnapshot = await getDocumentByFieldValue(COLLECTIONS.LODGES, "memberId", memberId);
    return mapFirestoreDocs<LodgeBaseDTO>(querySnapshot.docs);
  } catch (err) {
    console.error("[LodgesService] Error fetching lodges by member ID:", err);
    throw err;
  }
}
