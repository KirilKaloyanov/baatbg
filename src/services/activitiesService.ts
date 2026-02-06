import { getCollection, getDocument } from "./dbService";
import { RegionBaseDTO, RegionDTO } from "@/interfaces/RegionDTO";
import { mapFirestoreDocs } from "@/utils/firestoreUtils";
import { COLLECTIONS } from "@/constants/collections";
import { ActivityDTO } from "@/interfaces/ActivityDTO";

export default async function getAllActivities(): Promise<ActivityDTO[] | null> {
  try {
    const activitiesSnapshot = await getCollection(COLLECTIONS.ACTIVITIES);

    return mapFirestoreDocs<ActivityDTO>(activitiesSnapshot.docs);
  } catch (err) {
    console.error("[ActivitiesService] Error fetching all activities:", err);
    
    throw err;
  }
}