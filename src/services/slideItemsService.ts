import { getCollection } from "./dbService";
import { COLLECTIONS } from "../constants/collections";
import { SlideItemDTO } from "@/interfaces/SlideItemDTO"
import { mapFirestoreDocs } from "@/utils/firestoreUtils";

export async function getAllSlideItems() {
    try {
        const slideItems = await getCollection(COLLECTIONS.SLIDE_ITEMS);
        const mappedSlideItems =  mapFirestoreDocs<SlideItemDTO>(slideItems.docs)
        
        return mappedSlideItems.sort((a, b) => a.position - b.position);

    } catch (err) {
        console.error("[SlideItemsService] Error fetching slide items:", err);
        
        throw err;
    }
}