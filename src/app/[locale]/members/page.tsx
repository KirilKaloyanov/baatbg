import { getAllMembers } from "@services/memberService";
import CustomLink from "@components/customLink";

export default async function Members({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getAllMembers();
  console.log(data);
  if (!data) return <h1>Loading...</h1>;
  return (
    <>
      <h1>Members</h1>
      {data.map((member) => (
        <div key={member.id}>
          <CustomLink href={`/${locale}/members/${member.id}`}>
            {member.name[locale]}
          </CustomLink>{" "}
          - {member.typeLabel[locale]}
        </div>
      ))}
    </>
  );
}
