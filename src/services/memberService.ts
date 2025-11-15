import { getCollection, getDocument } from "./dbService";
import { MemberDTO as Member, MemberTypeDTO as MemberType, MemberWithTypeDTO } from "@/interfaces/MemberDTO";


export async function getMemberById(id: string) {
  try {    
    const memberTypes = await getMemberTypes();
    // const docReference = db.collection('members').doc(id)
    const data = await getDocument("members", id);
    if (data.exists()) {
      const typeLabel = memberTypes[data.data().typeId];
      return { id: data.id, ...data.data(), typeLabel } as MemberWithTypeDTO;
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

    const types = await getMemberTypes();

    const membersWithTypes: MemberWithTypeDTO[] = members.map((member) => ({
      ...member,
      typeLabel: types[member.typeId],
    }));
    return membersWithTypes;
  } catch (err) {
    console.error(err);
  }
  return null;
}


async function getMemberTypes() {

    const typesSnapshot = await getCollection('memberType');
    return typesSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = { ...doc.data() } as MemberType;
      return acc;
    }, {});
}