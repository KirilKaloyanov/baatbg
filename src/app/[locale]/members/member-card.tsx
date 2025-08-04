"use client";

import { MemberWithTypeDTO } from "@/interfaces/admin/MemberDTO";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import CustomLink from "@/components/navigation/customLink";
// import { storage } from "@firebaseClient";

export function MemberCard({
  member,
  locale,
}: {
  member: MemberWithTypeDTO;
  locale: string;
}) {
  console.log(member);
  return (
    <Card className="h-[400px] m-3 p-2">
      <CardTitle className="flex flex-col items-center mt-9">
        <h1>{member.name[locale]}</h1>
      </CardTitle>

      <CardDescription className="flex flex-col items-center">
        <img src={member.img} className="w-[200px] h-[200px] object-cover  rounded-full" />
      </CardDescription>

      <CardFooter>
        <CustomLink href={`/${locale}/members/${member.id}`}>
          {member.name[locale]}
        </CustomLink>{" "}
         - {member.typeLabel.label[locale]}
      </CardFooter>
    </Card>
  );
}
