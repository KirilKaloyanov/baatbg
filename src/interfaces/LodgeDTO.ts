import { ContactDTO } from "@/interfaces/ContactDTO";

export interface LodgeBaseDTO { 
    id: string; 
    location: {
        lat: number;
        lng: number;
    };
    community: {
        bg: string;
        en: string;
    };
    imgHero: string;
    name: {
        bg: string;
        en: string; 
    }
}

export interface LodgeDetailsDTO extends ContactDTO, LodgeBaseDTO {
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
