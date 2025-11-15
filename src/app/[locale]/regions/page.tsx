import { RegionDTO } from "@/interfaces/RegionDTO";
import { getAllRegions } from "@/services/regionsService";
import Image from "next/image";
import RegionCard from "./region-card";

export default async function RegionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allRegions = await getAllRegions();

  const mainRegion = allRegions?.find((region) => region.id === "main");

  const regions = allRegions?.filter((region) => region.id !== "main");

  return (
    <>
      {/* HERO IMAGE */}

      <div className="-mx-2 2xl:mx-auto 2xl:max-w-384">
        <div className="relative mb-6 h-150 w-full md:mb-12 lg:mb-16 xl:h-170">
          <Image
            src={mainRegion?.imgHero || "images/regions/regions-hero.jpg"}
            fill
            alt="View to Belogradchik rocks in Bulgaria"
            className="object-cover"
          />
          <h1 className="text-background absolute font-bold top-12 left-8 md:top-14 md:left-24 text-5xl md:text-6xl lg:text-7xl xl:text-9xl">
            {mainRegion && mainRegion.heading[locale]}
          </h1>
        </div>
      </div>

      <div className="container mx-auto mb-12">
        {/* MAIN CONTENT */}

        <div className="mb-12 flex flex-col md:flex-row">
          {/* IMAGE OF LUBOMIR POPIORDANOV */}

          <div className="mr-10 hidden md:block md:w-60">
            <Image
              src={`/images/regions/lubo-pop.jpg`}
              width={348}
              height={463}
              alt="Lubomir Popiordanov"
            />
          </div>

          {/* LARGE TEXT CONTAINER */}

          <div className="flex-1">
            <div className="float-left mr-5 w-30 md:hidden">
              <Image
                src={`/images/regions/lubo-pop.jpg`}
                width={348}
                height={463}
                alt="Lubomir Popiordanov"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: mainRegion?.text[locale] || "" }}
            ></div>

            {/* SIGNATURE CONTAINER */}

            <div className="flex flex-col md:flex-row">
              {/* NAME AND POSITION IN THE ORGANIZATION OF THE AUTHOR */}

              <div>
                <h5 className="mt-10">
                  {locale === "bg"
                    ? "Любомир Попйорданов"
                    : "Lubomir Popiordanov"}
                </h5>
                <span>
                  {locale === "bg"
                    ? "Член на Управителния съвет"
                    : "Member of the Management Board"}
                </span>
              </div>

              {/* SIGNATURE IMAGE OF THE AUTHOR */}

              <Image
                src={`/images/regions/signature.png`}
                width={150}
                height={50}
                alt="Signature of Lubomir Popiordanov"
                className="md:mt-10 md:ml-6"
              />

              {/* END OF SIGNATURE IMAGE OF THE AUTHOR */}
            </div>

            {/* END OF SIGNATURE CONTAINER */}
          </div>
        </div>

        {/* END OF MAIN CONTENT */}

        {/* THUMBNAILS CONTAINER */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {regions?.map((region: RegionDTO) => (
            <RegionCard key={region.id} region={region} locale={locale} />
          ))}
        </div>

        {/* END OF THUMBNAILS CONTAINER */}

      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const metadata = {
    title: locale === "bg" ? "Региони" : "Regions",
  };

  return metadata;
}
