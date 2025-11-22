import { getAllLodges } from "@/services/lodges.service";
import LodgesComponent from "./_lodgesComponent/lodgesComponent";
import { LodgeDTO } from "@/interfaces/LodgeDTO";
import { IMarker } from "@/interfaces/Marker";
import LodgeCard from "@/components/lodges/marker-card";

export default async function LodgesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lodges: LodgeDTO[] = await getAllLodges() || [];
  
  const markers: IMarker[] = lodges.map((lodge) => ({
    key: lodge.id,
    position: [lodge.location.lat, lodge.location.lng],
    community: lodge.community,
    imgHero: lodge.imgHero,
    name: lodge.name
  }));  

  const optimisticMarker: IMarker = markers[Math.floor(Math.random() * markers.length)];
  const initialSelectedMarker: IMarker = markers.length === 0 
    ? {
        key: '',
        position: [42.6977, 25.219],
        community: { bg: '', en: '' },
        imgHero: '',
        name: { bg: '', en: '' },
      } as IMarker 
    : optimisticMarker;

  return (
    <>
      <h1 className="mt-10 text-center">
        {locale === "en" ? "Guesthouses" : "Къщи за гости"}
      </h1>
      <LodgesComponent locale={locale} markers={markers} initialSelectedMarker={initialSelectedMarker} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"> 
        {markers.length > 0 && markers.map((marker) => <LodgeCard key={marker.key} marker={marker} locale={locale} />)}
      </div>
    </>
  );
}

export const metadata = {
  title: "Lodges",
};
