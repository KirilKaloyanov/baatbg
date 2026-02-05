import { ContactDTO } from "@/interfaces/ContactDTO";
import LocalizedString from "./LocalizedString";
import { Coordinates } from "./Coordinates";

export interface LodgeBaseDTO { 
    id: string; 
    location: Coordinates;
    community: LocalizedString;
    imgHero: string;
    name: LocalizedString
}

export interface LodgeDetailsDTO extends ContactDTO, LodgeBaseDTO {
  memberId: string;
  regionId: string;
  images?: string[];
  webcontent: [
    {
      heading: LocalizedString;
      text: LocalizedString;
      img: string;
    },
  ];
}
