import { getCollection, getCollectionByCustomFilter, getCollectionByFieldValue } from "./dbService";
import {  where, QueryConstraint } from "firebase/firestore";

import { mapFirestoreDocs } from "@/utils/firestoreUtils";

import { getAllRegions } from "./regionsService";
import getAllActivities from "./activitiesService";

import { mapTourToUI } from "@/utils/tourFilterUtils";

import { TourDTO, TourUI } from "@/interfaces/TourDTO";
import { ActivityDTO } from "@/interfaces/activityDTO";

import { COLLECTIONS } from "@/constants/collections";
import { getAllMembers } from "./memberService";
import { MemberDTO } from "@/interfaces/MemberDTO";
import { normalize } from "path";


export async function getAllTours() {
    try {
        const toursSnapshot = await getCollection(COLLECTIONS.TOURS);
        const tours = mapFirestoreDocs<TourDTO>(toursSnapshot.docs);
        return await denormalizeToursForUI(tours);

    } catch (error) {
        console.error("[Tours service] Error fetching all tours:", error);
        throw error;
    }
}

export async function getToursByMemberId(memberId: string) {
    try {
        const toursSnapshot = await getCollectionByFieldValue(COLLECTIONS.TOURS, 'memberId', memberId);
        const tours = mapFirestoreDocs<TourDTO>(toursSnapshot.docs);
        return await denormalizeToursForUI(tours);

    } catch (error) {
        console.error("[Tours service] Error fetching tours by member ID:", error);
        throw error;
    }
}

export async function getToursByRegion(regionId: string) {
    try {
        const constraints: QueryConstraint[] = [
            where('regions', 'array-contains', regionId)
        ];
        const filteredToursSnapshot = await getCollectionByCustomFilter(COLLECTIONS.TOURS, constraints);
        const tours = mapFirestoreDocs<TourDTO>(filteredToursSnapshot.docs);

        return denormalizeToursForUI(tours);
    } catch (error) {
        console.error("[Tours service] Error fetching tours by region:", error);
        throw error;
    }
}

export async function getToursByFilter(filters: any): Promise<TourUI[] | null> {
    'use server';

    try {
        const constraints: QueryConstraint[] = [];

        // 1. Handle Activity Filter (Array-Contains-Any)
        if (filters.activityFilter?.length > 0) {
            constraints.push(where('activities', 'array-contains-any', filters.activityFilter));
        }

        // 2. Handle Duration Filter (Range)
        const durationValue = filters.durationFilter;

        if (durationValue && durationValue !== "") {
            if (durationValue === "1" || durationValue === "2") {
                const durationNum = Number(durationValue);
                if (!isNaN(durationNum)) {
                    constraints.push(where('duration', '==', durationNum));
                }
            } else if (durationValue === "15+") {
                constraints.push(where('duration', '>', 15));
            } else {
                const [min, max] = durationValue.split('-').map(Number);
                if (!isNaN(min) && !isNaN(max)) {
                    constraints.push(where('duration', '>=', min));
                    constraints.push(where('duration', '<=', max));
                }
            }
        }

        const filteredToursSnapshot = await getCollectionByCustomFilter(COLLECTIONS.TOURS, constraints);
        const toursFromDB = mapFirestoreDocs<TourDTO>(filteredToursSnapshot.docs);

        return await denormalizeToursForUI(toursFromDB);

    } catch (error) {
        console.error("[Tours service] Error filtering tours:", error);
        throw error;
    }
}

async function denormalizeToursForUI(tours: TourDTO[]): Promise<TourUI[]> {
        const regions = await getAllRegions();
        const activities: ActivityDTO[] | null = await getAllActivities();
        const members: MemberDTO[] | null = await getAllMembers();

        return tours.map(tour => mapTourToUI(tour, regions || [], activities || [], members || [])); 
}
