
import { ContactDTO } from "./ContactDTO";

export interface MemberDTO extends ContactDTO {
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
  img?: string;
}

export interface MemberWithTypeDTO extends MemberDTO {
  typeLabel: {
    label: {
      bg: string,
      en: string
    }
  }
}

export interface MemberTypeDTO {
  id: string;
  label: {
    en: string;
    bg: string;
  };
}
