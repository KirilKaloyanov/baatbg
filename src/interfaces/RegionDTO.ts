import LocalizedString from "./LocalizedString";

export interface RegionBaseDTO {
  id: string;
  header: LocalizedString;
}

export interface RegionDTO extends RegionBaseDTO {
  imgThumb: string;
  imgHero: string;
  heading: LocalizedString;
  text: LocalizedString;
}
