import { getMemberById } from "@services/memberService";

export default async function Member({
  params,
}: {
  params: Promise<{ memberId: string; locale: string }>;
}) {
  const { memberId, locale } = await params;

  const member = await getMemberById(memberId);
  if (!member) return <h1>Loading...</h1>;
  return (
    <>
      <h1 className="mt-10 text-center">{member.name[locale]}</h1>
      <h3 className="mt-10 text-center">{member.typeLabel.label[locale]}</h3>
      <p>{member.phone}</p>
      <p>{member.email}</p>
      <p>{member.website}</p>
      <p>{member.address ? member.address[locale] : ""}</p>
      <p>{member.description[locale]}</p>
    </>
  );
}
