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
      <h1>{member.name[locale]}</h1>
      <div>{member.phone}</div>
      <div>{member.address ? member.address[locale] : ""}</div>
      <div>{member.description[locale]}</div>
    </>
  );
}
