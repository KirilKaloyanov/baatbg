import { getAllLodges } from "@/services/lodges.service";
import LodgesComponent from "./_lodgesComponent/lodgesComponent";
import { LodgeExtendedDTO } from "@/interfaces/LodgeExtendedDTO";
// import { IMarker } from "@/interfaces/Marker";
import LodgeCard from "@/components/cards/lodge-card";
import { LodgeSimpleDTO } from "@/interfaces/LodgeSimpleDTO";

export default async function LodgesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lodges: LodgeExtendedDTO[] = await getAllLodges() || [];
  
  const markers: LodgeSimpleDTO[] = lodges.map((lodge) => ({...lodge}) as LodgeSimpleDTO);  
  // const markers: IMarker[] = lodges.map((lodge) => ({
  //   key: lodge.id,
  //   position: [lodge.location.lat, lodge.location.lng],
  //   community: lodge.community,
  //   imgHero: lodge.imgHero,
  //   name: lodge.name
  // }));  

  const optimisticMarker: LodgeSimpleDTO = markers[Math.floor(Math.random() * markers.length)];
  const initialSelectedMarker: LodgeSimpleDTO = markers.length === 0 
    ? {
        id: '',
        location: { lat: 42.6977, lng: 25.219 },
        community: { bg: '', en: '' },
        imgHero: '',
        name: { bg: '', en: '' },
      } as LodgeSimpleDTO 
    : optimisticMarker;

  return (
    <>
      <h1 className="mt-10 text-center">
        {locale === "en" ? "Guesthouses" : "Къщи за гости"}
      </h1>
      <LodgesComponent locale={locale} markers={markers} initialSelectedMarker={initialSelectedMarker} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"> 
        {markers.length > 0 && markers.map((marker) => <LodgeCard key={marker.id} marker={marker} locale={locale} />)}
      </div>
    </>
  );
}

export const metadata = {
  title: "Lodges",
  // todo
  // todo
  // todo
  // todo
  // todo
  // todo
};
