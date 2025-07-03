import { getTranslations } from "next-intl/server";
import CustomLink from "@/components/navigation/customLink";
import { MemberCard } from "./member-card";
import { getAllMembers } from "@services/memberService";

export default async function Members({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");
  const { locale } = await params;
  const data = await getAllMembers();

  // if (!data) return <h1>Loading...</h1>;
  return (
    !data ?  <h1>Loading...</h1>
      :
    <div>
      <h1 className="mt-10 text-center">{t("members")}</h1>
      {data.map((member) => (
        <div key={member.id}>
          <MemberCard member={member} />
          <CustomLink href={`/${locale}/members/${member.id}`}>
            {member.name[locale]}
          </CustomLink>{" "}
          - {member.typeLabel.label[locale]}
        </div>
      ))}
    </div>
  );
}
