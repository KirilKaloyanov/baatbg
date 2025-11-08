"use client";

import { motion } from "framer-motion";
import CustomLink from "@/components/navigation/customLink";
import { MemberWithTypeDTO } from "@/interfaces/admin/MemberDTO";

export default function MemberCard({
  member,
  locale,
}: {
  member: MemberWithTypeDTO;
  locale: string;
}) {
  return (
    <motion.div
      className="h-full w-full transition"
      initial={{ y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <CustomLink
        href={`/${locale}/members/${member.id}`}
        className="no-marker"
      >
        <div className="h-8"></div>
        <div className="bg-gray-50 text-center">
          <div className="mx-auto flex h-50 w-50 items-center justify-center bg-white p-1">
            {member.img && (
              <img
                className="max-h-full max-w-full"
                src={member.img}
                alt={member.name + " logo"}
              />
            )}
          </div>
        </div>
        <div className="px-6 py-5 text-center">
          <p className="mb-1 text-xs font-bold tracking-widest text-cyan-600 uppercase">
            {member.typeLabel.label[locale]}
          </p>
          <h3 className="text-2xl leading-tight font-extrabold text-gray-800">
            {member.name[locale]}
          </h3>
        </div>
      </CustomLink>
    </motion.div>
  );
}
