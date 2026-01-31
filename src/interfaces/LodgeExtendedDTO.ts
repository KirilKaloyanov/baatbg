import { ContactDTO } from "@/interfaces/ContactDTO";
import { LodgeSimpleDTO } from "@/interfaces/LodgeSimpleDTO";

export interface LodgeExtendedDTO extends ContactDTO, LodgeSimpleDTO {
  memberId: string;
  regionId: string;
  images?: string[];
  webcontent: [
    {
      heading: {
        bg: string;
        en: string;
      };
      text: {
        bg: string;
        en: string;
      };
      img: string;
    },
  ];
}
