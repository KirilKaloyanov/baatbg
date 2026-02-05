import { ActivityDTO } from "@/interfaces/activityDTO";
import LocalizedString from "@/interfaces/LocalizedString";
import { MemberDTO } from "@/interfaces/MemberDTO";
import { RegionBaseDTO } from "@/interfaces/RegionDTO";
import { TourDTO, TourUI } from "@/interfaces/TourDTO";

/**
 * Filters tours based on whether they contain any of the selected regions.
 * Effectively an "OR" filter: return if tour has region A OR region B.
 * 
 */
export function filterToursByRegion(
    tours: TourUI[], 
    selectedRegions: string[]
): TourUI[] {
    // If no filter is selected, return all tours
    if (!selectedRegions || selectedRegions.length === 0) {
        return tours;
    }

    return tours.filter((tour) => 
        // Check if at least one region in the tour exists in the selectedRegions array
        tour.regions.some((region) => selectedRegions.includes(region))
    );
}

/**
 * Adds denormalized region and activity names to the tour data for UI display.
 * 
 */

export function mapTourToUI(tour: TourDTO, regions: RegionBaseDTO[], activities: ActivityDTO[], members: MemberDTO[]): TourUI {

    return ({
       ...tour,
        regionsNames: tour.regions.map(regionId => regions?.find(r => r.id === regionId)?.header as LocalizedString || {}),
        activitiesNames: tour.activities.map(activityId => activities?.find(a => a.id === activityId) as LocalizedString || {}), 
        memberName: members?.find(member => member.id === tour.memberId)?.name as LocalizedString || {}
    }) as TourUI;
}