import Image from "next/image";

import { RegionDTO } from "@/interfaces/RegionDTO";
import { getRegionById } from "@/services/regionsService";

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { locale, region: regionId } = await params;

  const region: RegionDTO | null = await getRegionById(regionId);

  return (
    <>
      <div className="-mx-2 2xl:mx-auto 2xl:max-w-384">
        <div className="relative mb-6 h-150 w-full md:mb-12 lg:mb-16 xl:h-170">
          <Image
            src={region?.imgHero || ""}
            fill
            className="h-full w-full object-cover"
            alt={region?.header[locale] + " image"}
          />
          <h1 className="text-background absolute top-12 left-8 text-5xl font-bold md:top-14 md:left-24 md:text-6xl lg:text-7xl xl:text-9xl">
            {region?.header[locale]}
          </h1>
        </div>
      </div>

      <div className="container mx-auto mb-12">
        <div className="prose">
          <h1 className="mb-4 text-3xl font-bold">{region?.heading[locale]}</h1>
          <div
            className="my-8 gap-10 lg:columns-2 xl:gap-20"
            dangerouslySetInnerHTML={{
              __html: region?.text[locale] || "",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { locale, region } = await params;

  const regionData: RegionDTO | null = await getRegionById(region);

  const metadata = {
    title: regionData?.header[locale] || ""
  };

  return metadata;
}
