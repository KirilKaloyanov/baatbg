import Image from "next/image";

import { RegionDTO } from "@/interfaces/RegionDTO";
import { getRegionById } from "@/services/regionsService";
import { LodgeSimpleDTO } from "@/interfaces/LodgeSimpleDTO";
import { getLodgesByRegionId } from "@/services/lodges.service";
import LodgeCard from "@/components/cards/lodge-card";

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; regionId: string }>;
}) {
  const { locale, regionId } = await params;

  const region: RegionDTO | null = await getRegionById(regionId);
  const lodges: LodgeSimpleDTO[] = await getLodgesByRegionId(regionId) || [];

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

      <div className="container mx-auto mb-12">
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
      {lodges && lodges.length > 0 && (
        <div className="container mx-auto">
          <h1 className="my-8 text-2xl font-bold">{locale === "en" ? "Guesthouses" : "Къщи за гости"}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
            {lodges.map((lodge) => (<LodgeCard key={lodge.id} marker={{...lodge, location: {lat: lodge.location.lat, lng: lodge.location.lng}, id: lodge.id}} locale={locale} />))}
          </div>
        </div>
      )}
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
