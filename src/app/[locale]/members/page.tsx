import { getAllMembers } from "@services/memberService";
import Link from "next/link";

export default async function Members({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getAllMembers();

  if (!data) return <h1>Loading...</h1>;
  return (
    <>
      <h1>Members</h1>
      {data.map((member) => (
        <div key={member.id}>
          <Link href={`/${locale}/members/${member.id}`}>
            {member.name[locale]}
          </Link>{" "}
          - {member.typeLabel.label[locale]}
        </div>
      ))}
    </>
  );
}
