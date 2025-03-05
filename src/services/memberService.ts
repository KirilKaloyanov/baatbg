import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "@firebaseConfig";

interface MemberType {
  en: string;
  bg: string;
}

interface Member {
  id: string;
  typeId: string;
  name: {
    bg: string;
    en: string;
  };
  description: {
    bg: string;
    en: string;
  };
  address?: {
    bg: string;
    en: string;
  };
  website?: string;
  phone?: string;
  email?: string;
  img?: string;
}

export async function getMemberById(id: string) {
  try {
    const docRef = collection(db, "members");
    const docData = doc(docRef, id);
    const data = await getDoc(docData);
    if (data.exists()) {
      return { id: data.id, ...data.data() } as Member;
    } else throw new Error("Document not found!");
  } catch (err) {
    console.error(err);
  }
}

export async function getAllMembers() {
  try {
    const membersSnapshot = await getDocs(collection(db, "members"));
    const members = membersSnapshot.docs.map((doc) => {
      //   console.log(doc.id);
      return {
        id: doc.id,
        ...doc.data(),
      } as Member;
    });

    const typesSnapshot = await getDocs(collection(db, "memberType"));
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
