import Image from "next/image";

import ContactsCard from "@/components/cards/contact-card";
import LodgeCard from "@/components/cards/lodge-card";

import { LodgeBaseDTO } from "@/interfaces/LodgeDTO";
import { MemberWithTypeDTO } from "@/interfaces/MemberDTO";

import { getLodgesByMemberId } from "@/services/lodges.service";
import { getMemberById } from "@services/memberService";
import { TourUI } from "@/interfaces/TourDTO";
import { getToursByMemberId } from "@/services/tourService";
import TourCard from "@/components/cards/tour-card/tour-card";

export default async function Member({
  params,
}: {
  params: Promise<{ memberId: string; locale: string }>;
}) {
  const { memberId, locale } = await params;

  const member: MemberWithTypeDTO | null = await getMemberById(memberId);

  if (!member) return <h1>Loading...</h1>;

  const lodges: LodgeBaseDTO[] = (await getLodgesByMemberId(memberId)) || [];
  const tours: TourUI[] = await getToursByMemberId(memberId);

  return (
    <>
      <h1 className="mt-10 text-center">{member.name[locale]}</h1>
          <h3 className="mt-8 text-center">{member.typeLabel.label[locale]}</h3>

      <div className="mt-8 grid md:gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center">
          {member.img &&
            <Image
              src={member.img} // Replace with the actual image URL or path
              alt={`${member.name[locale]} image`}
              className="mb-4 max-w-full max-h-60 object-contain shadow-md"
              width={300} 
              height={300} 
            />
          }
          <ContactsCard contact={member} locale={locale} />
        </div>
        <div className="flex justify-center">
          <p>{member.description[locale]}</p>
        </div>
      </div>

      {lodges && lodges.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {lodges.map((lodge) => (
              <LodgeCard
                key={lodge.id}
                lodge={lodge}
                locale={locale}
              />
            ))}
        </div>
      )}

      {tours && tours.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} locale={locale} />
            ))}
        </div>
      )}

    </>
  );
}
