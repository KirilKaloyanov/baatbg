import { getCollection, getDocument } from "./dbService";
import { MemberDTO as Member, MemberWithTypeDTO, MemberTypeDTO as MemberType } from "@/interfaces/MemberDTO";
import { mapFirestoreDocs, mapFireStoreSingleDoc } from "@/utils/firestoreUtils";
import { COLLECTIONS } from "@/constants/collections";

export async function getMemberById(id: string): Promise<MemberWithTypeDTO | null> {
  try {
    const memberTypes = await getMemberTypes();
    const data = await getDocument(COLLECTIONS.MEMBERS, id);

    if (data.exists()) {
      const member = mapFireStoreSingleDoc<Member>(data);
      const typeLabel = memberTypes[member.typeId];
      return { ...member, typeLabel } as MemberWithTypeDTO;
    }

    console.warn("[MemberService] Member not found:", id);
    return null;
  } catch (err) {
    console.error("[MemberService] Error fetching member by ID:", err);
    throw err;
  }
}

export async function getAllMembers(): Promise<MemberWithTypeDTO[] | null> {
  try {
    const membersSnapshot = await getCollection(COLLECTIONS.MEMBERS);
    const members = mapFirestoreDocs<Member>(membersSnapshot.docs);

    const memberTypes = await getMemberTypes();

    return members.map((member) => ({
      ...member,
      typeLabel: memberTypes[member.typeId],
    }));
  } catch (err) {
    console.error("[MemberService] Error fetching all members:", err);
    throw err;
  }
}

async function getMemberTypes(): Promise<Record<string, MemberType>> {
  try {
    const typesSnapshot = await getCollection(COLLECTIONS.MEMBER_TYPE);
    return typesSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = { ...doc.data() } as MemberType;
      return acc;
    }, {});
  } catch (err) {
    console.error("[MemberService] Error fetching member types:", err);
    throw err;
  }
}