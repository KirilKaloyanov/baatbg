import ContactsCard from "@/components/cards/contact-card";
import LodgeCard from "@/components/cards/lodge-card";
import { LodgeExtendedDTO } from "@/interfaces/LodgeExtendedDTO";
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

  const lodges: LodgeExtendedDTO[] = (await getLodgesByMemberId(memberId)) || [];
  return (
    <>
      <h1 className="mt-10 text-center">{member.name[locale]}</h1>
          <h3 className="mt-8 text-center">{member.typeLabel.label[locale]}</h3>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ContactsCard contact={member} locale={locale} />
        <div className="flex justify-center">
          <p>{member.description[locale]}</p>
        </div>
      </div>

      {lodges && lodges.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {lodges.length > 0 &&
            lodges.map((lodge) => (
              <LodgeCard
                key={lodge.id}
                marker={lodge}
                locale={locale}
              />
            ))}
        </div>
      )}
    </>
  );
}
