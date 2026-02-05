import ToursFilter from "@/components/forms/ToursFilter";
import getAllActivities from "@/services/activitiesService";
import { getAllRegionNames } from "@/services/regionsService";
import { getAllTours, getToursByFilter } from "@/services/tourService";

export default async function ToursList({ params }: { params: Promise<{ locale: string }> }) {

  const { locale } = await params;
  const tours = await getAllTours();
  const regionNames = await getAllRegionNames();
  const activities = await getAllActivities();

  return (
    <>
      <ToursFilter locale={locale} regionNames={regionNames || []} activities={activities || []} initialTours={tours ||[]} getToursByFilter={getToursByFilter}/>
    </>
  );
}

export const metadata = {
  title: "Tours"
}