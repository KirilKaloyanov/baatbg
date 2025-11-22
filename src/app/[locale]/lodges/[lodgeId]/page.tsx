import Image from "next/image";
import { getLodgeById } from "@/services/lodges.service";
import { LodgeDTO } from "@/interfaces/LodgeDTO";
import MapContainerComponent from "./mapContainer";
import Button from "@/components/button";

export default async function LodgePage({
  params,
}: {
  params: Promise<{ locale: string; lodgeId: string }>;
}) {
  const { locale, lodgeId } = await params;
  const lodge: LodgeDTO | null = await getLodgeById(lodgeId);

  if (!lodge) return null;

  return (
    <>
      <div id="anchor-for-back-to-top" className="relative">
        <div id="contacts" className="absolute -top-40" />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="flex justify-center">
          <h1 className="mt-8">{lodge.name[locale]}</h1>
        </div>

        <div className="mb-8 flex w-full flex-col items-center justify-center md:mb-0 md:min-h-[200px]">
          <div className="flex w-full justify-around">
            <div className="flex-1">
              <div className="flex">
                <img
                  src="/icons/icon_small_bw.png"
                  alt="Bullet icon"
                  className="mr-2 hidden md:inline-block h-6 w-6"
                />
                <p className="flex-1">
                  <span className="block">
                    {lodge.community[locale]}
                  </span>
                  {lodge.address && (
                    <span className="block">
                      {lodge.address[locale]}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex">
                <img
                  src="/icons/icon_small_bw.png"
                  alt="Bullet icon"
                  className="mr-2 hidden md:inline-block h-6 w-6"
                />
                <p>
                  <span className="block">
                    {lodge.phone}
                  </span>
                  {lodge.email && (
                    <span className="block">
                      {lodge.email}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          {lodge.site && (
            <a
              className="block font-bold"
              href={
                /^https?:\/\//i.test(lodge.site)
                  ? lodge.site
                  : `https://${lodge.site}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {lodge.site ? lodge.site : ""}
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="h-[400px] flex-1 md:h-[500px]">
          <div className="relative h-[400px] w-full max-w-4xl overflow-hidden md:h-[500px]">
            <Image
              src={lodge.imgHero}
              alt={lodge.name[locale]}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="h-[500px] w-full flex-1">
          <MapContainerComponent
            center={[lodge.location.lat, lodge.location.lng]}
          />
        </div>
      </div>

      {lodge.webcontent &&
        lodge.webcontent.length > 0 &&
        lodge.webcontent.map((wb, idx) => {
          return (
            <div
              key={idx}
              className={`mt-8 flex flex-col p-10 ${idx % 2 === 0 ? "bg-stone-300 md:flex-row" : "md:flex-row-reverse"} gap-8`}
            >
              <div className="mb-8 flex w-full flex-col items-center justify-center md:mb-0 md:min-h-[200px]">
                <h2>{wb.heading[locale]}</h2>
                <p>{wb.text[locale]}</p>
              </div>
              {wb.img && (
                <div className="relative h-[400px] w-full overflow-hidden">
                  <Image
                    src={wb.img}
                    alt={wb.heading[locale] + idx}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}

      {lodge.images && lodge.images.length > 0 && lodge.images[0] && (
        <div className={`mt-8 grid gap-8 p-10 md:grid-cols-2`}>
          {lodge.images.map((img, idx) => {
            return (
              <div
                key={idx}
                className="relative h-[400px] w-full overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${lodge.name[locale]} image ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
      <a href="#contacts" className="my-8 flex justify-center">
        <Button text={locale === "bg" ? "Нагоре" : "Back to top"} />
      </a>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lodgeId: string }>;
}) {
  const { locale, lodgeId } = await params;
  const lodgeData: LodgeDTO | null = await getLodgeById(lodgeId);

  const metadata = {
    title: lodgeData?.name[locale] || (locale === "bg" ? "БААТ" : "BAAT"),
  };

  return metadata;
}
