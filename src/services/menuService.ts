import { getCollection, getDocument } from "./dbService";
import { MenuDTO } from "@/interfaces/MenuDTO";
import { mapFirestoreDocs } from "@/utils/firestoreUtils";
import { COLLECTIONS } from "@/constants/collections";

export async function getMenuItems(): Promise<MenuDTO[] | null> {
  try {
    const querySnapshot = await getCollection(COLLECTIONS.MENU);
    const data = mapFirestoreDocs<MenuDTO>(querySnapshot.docs);
    return data.sort((a: MenuDTO, b: MenuDTO) => a.position - b.position);
  } catch (error) {
    console.error("[MenuService] Error fetching menu items:", error);
    throw error;
  }
}

export async function getMenuById(itemId: string): Promise<MenuDTO | null> {
  try {
    const docSnap = await getDocument(COLLECTIONS.MENU, itemId);
    if (docSnap.exists()) {
      return docSnap.data() as MenuDTO;
    }
    console.warn("[MenuService] Menu item not found:", itemId);
    return null;
  } catch (error) {
    console.error("[MenuService] Error fetching menu by ID:", error);
    throw error;
  }
}