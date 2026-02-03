import { getAllLodges } from "@/services/lodges.service";
import LodgesComponent from "./_lodgesComponent/lodgesComponent";
import LodgeCard from "@/components/cards/lodge-card";
import { LodgeBaseDTO } from "@/interfaces/LodgeDTO";

export default async function LodgesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lodges: LodgeBaseDTO[] = await getAllLodges() || [];
  
  const randomLodge: LodgeBaseDTO = lodges[Math.floor(Math.random() * lodges.length)];
  const initialSelectedLodge: LodgeBaseDTO = lodges.length === 0 
    ? {
        id: '',
        location: { lat: 42.6977, lng: 25.219 },
        community: { bg: '', en: '' },
        imgHero: '',
        name: { bg: '', en: '' },
      } as LodgeBaseDTO 
    : randomLodge;

  return (
    <>
      <h1 className="mt-10 text-center">
        {locale === "en" ? "Guesthouses" : "Къщи за гости"}
      </h1>
      <LodgesComponent locale={locale} lodges={lodges} initialSelectedLodge={initialSelectedLodge} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"> 
        {lodges.length > 0 && lodges.map((lodge) => <LodgeCard key={lodge.id} lodge={lodge} locale={locale} />)}
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
