import Image from "next/image";

import { getRegionById } from "@/services/regionsService";
import { getLodgesByRegionId } from "@/services/lodges.service";

import LodgeCard from "@/components/cards/lodge-card";

import { RegionDTO } from "@/interfaces/RegionDTO";
import { LodgeBaseDTO } from "@/interfaces/LodgeDTO";
import { TourUI } from "@/interfaces/TourDTO";
import { getToursByRegion } from "@/services/tourService";
import TourCard from "@/components/cards/tour-card/tour-card";

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; regionId: string }>;
}) {
  const { locale, regionId } = await params;

  const region: RegionDTO | null = await getRegionById(regionId);
  const lodges: LodgeBaseDTO[] = await getLodgesByRegionId(regionId) || [];
  const tours: TourUI[] = await getToursByRegion(regionId);

  if (!region) return null;

  return (
    <>
      <div className="-mx-2 2xl:mx-auto 2xl:max-w-384">
        <div className="relative mb-6 h-150 w-full md:mb-12 lg:mb-16 xl:h-170">
          <Image
            src={region.imgHero}
            fill
            className="h-full w-full object-cover"
            alt={region.header[locale] + " image"}
          />
          <h1 className="text-background absolute top-12 left-8 text-5xl font-bold md:top-14 md:left-24 md:text-6xl lg:text-7xl xl:text-9xl">
            {region.header[locale]}
          </h1>
        </div>
      </div>

      <div className="container mx-auto mb-12 px-2">
        <div className="prose">
          <h1 className="mb-4 text-3xl font-bold">{region.heading[locale]}</h1>
          <div
            className="my-8 gap-10 lg:columns-2 xl:gap-20"
            dangerouslySetInnerHTML={{
              __html: region.text[locale] || "",
            }}
          ></div>
        </div>
      </div>
      <div className="container mx-auto px-2">
      {lodges && lodges.length > 0 && (
        <>
          <h1 className="mt-8 mb-4 text-3xl font-bold">{locale === "en" ? "Guesthouses" : "Къщи за гости"}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
            {lodges.map((lodge) => (<LodgeCard key={lodge.id} lodge={lodge} locale={locale} />))}
          </div>
        </>
      )}
      {tours && tours.length > 0 && (
        <>
          <h1 className="mt-8 mb-4 text-3xl font-bold">{locale === "en" ? "Tours" : "Пътувания"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
            {tours.map((tour) => (<TourCard key={tour.id} tour={tour} locale={locale} />))}
          </div>
        </>
      )}

      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; regionId: string }>;
}) {
  const { locale, regionId } = await params;

  const regionData: RegionDTO | null = await getRegionById(regionId);

  const metadata = {
    title: regionData?.header[locale] || (locale === "bg" ? "БААТ" : "BAAT")
  };

  return metadata;
}
