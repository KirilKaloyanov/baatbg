import LocalizedString from "./LocalizedString";

export type MenuDTO = {
  id: string;
  label: LocalizedString;
  position: number;
  path: string;
};
