import { Coordinates } from "./Coordinates";
import LocalizedString from "./LocalizedString";

export interface TourDTO {
    id: string;
    activities: string[];
    duration: number;
    itinerary: Coordinates[];
    zoom: number;
    center: Coordinates;
    link: string;
    memberId: string;
    regions: string[];
    title: LocalizedString;
}

export interface TourUI extends TourDTO {
    activitiesNames: LocalizedString[];
    regionsNames: LocalizedString[];
    memberName: LocalizedString;
}