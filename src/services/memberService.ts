import { getCollection, getDocument } from "./dbService";
import { MemberDTO as Member, MemberTypeDTO as MemberType } from "@/interfaces/admin/MemberDTO";


export async function getMemberById(id: string) {
  try {    
    // const docReference = db.collection('members').doc(id)
    const data = await getDocument("members", id);
    if (data.exists()) {
      return { id: data.id, ...data.data() } as Member;
    } else throw new Error("Document not found!");
  } catch (err) {
    console.error(err);
  }
}

export async function getAllMembers() {
  try {
    const membersSnapshot = await getCollection('members');
    const members = membersSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Member;
    });

    const typesSnapshot = await getCollection('memberType');
    const types = typesSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = { ...doc.data() } as MemberType;
      return acc;
    }, {});

    const membersWithTypes = members.map((member) => ({
      ...member,
      typeLabel: types[member.typeId],
    }));
    return membersWithTypes;
  } catch (err) {
    console.error(err);
  }
  return null;
}
