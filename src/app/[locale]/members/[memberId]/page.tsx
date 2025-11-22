import LodgeCard from "@/components/lodges/marker-card";
import { LodgeDTO } from "@/interfaces/LodgeDTO";
import { getLodgesByMemberId } from "@/services/lodges.service";
import { getMemberById } from "@services/memberService";

export default async function Member({
  params,
}: {
  params: Promise<{ memberId: string; locale: string }>;
}) {
  const { memberId, locale } = await params;

  const member = await getMemberById(memberId);
  
  if (!member) return <h1>Loading...</h1>;
  
  const lodges: LodgeDTO[] = await getLodgesByMemberId(memberId) || [];
  return (
    <>
      <h1 className="mt-10 text-center">{member.name[locale]}</h1>
      <h3 className="mt-10 text-center">{member.typeLabel.label[locale]}</h3>
      <p>{member.phone}</p>
      <p>{member.email}</p>
      <p>{member.website}</p>
      <p>{member.address ? member.address[locale] : ""}</p>
      <p>{member.description[locale]}</p>
      {lodges && lodges.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lodges.length > 0 && lodges.map((lodge) => (
            <LodgeCard key={lodge.id} marker={{...lodge, position: [lodge.location.lat, lodge.location.lng], key: lodge.id}} locale={locale} />
          ))}
        </div>
      )}
    </>
  );
}
