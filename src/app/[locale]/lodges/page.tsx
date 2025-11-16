import { getAllLodges } from "@/services/lodges.service";
import LodgesComponent from "./lodgesComponent";
import { LodgeDTO } from "@/interfaces/LodgeDTO";
import { IMarker } from "@/interfaces/Marker";

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
    imgHero: lodge.imgHero,
    name: {
      bg: lodge.name.bg,
      en: lodge.name.en,
    }
  }));  

  const optimisticMarker: IMarker = markers[Math.floor(Math.random() * markers.length)];
  const initialSelectedMarker: IMarker = markers.length === 0 
    ? {
        key: '',
        position: [42.6977, 25.219],
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
    </>
  );
}

export const metadata = {
  title: "Lodges",
};
