import { getTranslations } from "next-intl/server";
import { getAllMembers } from "@services/memberService";
import MemberCard from "./member-card";

export default async function Members({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");
  const { locale } = await params;
  const members = await getAllMembers();

  return !members ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1 className="mt-10 text-center">{t("members")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <div key={member.id}>
            <MemberCard member={member} locale={locale}/>
          </div>
        ))}

      </div>
    </div>
  );
}
