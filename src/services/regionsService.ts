import { getCollection, getDocument } from "./dbService";
import { RegionBaseDTO, RegionDTO } from "@/interfaces/RegionDTO";
import { mapFirestoreDocs } from "@/utils/firestoreUtils";
import { COLLECTIONS } from "@/constants/collections";

export async function getAllRegions(): Promise<RegionDTO[] | null> {
  try {
    const regionsSnapshot = await getCollection(COLLECTIONS.REGIONS);
    return mapFirestoreDocs<RegionDTO>(regionsSnapshot.docs);
  } catch (err) {
    console.error("[RegionsService] Error fetching all regions:", err);
    throw err;
  }
}

export async function getAllRegionNames(): Promise<RegionBaseDTO[] | null> {
  const regions = await getAllRegions();
  if (regions) {
    return regions
      .filter((region) => region.id !== "main")
      .map((region) => ({
        id: region.id,
        header: region.header,
      }));
  }
  return null;
}

export async function getRegionById(id: string): Promise<RegionDTO | null> {
  try {
    const data = await getDocument(COLLECTIONS.REGIONS, id);
    if (data.exists()) {
      return { id: data.id, ...data.data() } as RegionDTO;
    }
    console.warn("[RegionsService] Region not found:", id);
    return null;
  } catch (err) {
    console.error("[RegionsService] Error fetching region by ID:", err);
    throw err;
  }
}
