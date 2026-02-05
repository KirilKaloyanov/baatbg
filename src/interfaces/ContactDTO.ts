import LocalizedString from "./LocalizedString";

export interface ContactDTO {
  phone?: string;
  email?: string;
  site?: string;
  community: LocalizedString;
  address?: LocalizedString;
}