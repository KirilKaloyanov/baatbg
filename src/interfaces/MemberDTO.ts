
import { ContactDTO } from "./ContactDTO";
import LocalizedString from "./LocalizedString";

export interface MemberDTO extends ContactDTO {
  id: string;
  typeId: string;
  name: LocalizedString;
  description: LocalizedString;
  img?: string;
}

export interface MemberWithTypeDTO extends MemberDTO {
  typeLabel: {
    label: LocalizedString
  }
}

export interface MemberTypeDTO {
  id: string;
  label: LocalizedString;
}
