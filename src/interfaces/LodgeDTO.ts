export interface LodgeDTO {
  id: string;
  community: {
    bg: string;
    en: string;
  };
  name: {
    bg: string;
    en: string;
  };
  memberId: string;
  regionId: string;
  address?: {
    bg: string;
    en: string;
  };
  phone: string;
  email?: string;
  site?: string;
  location: {
    lat: number;
    lng: number;
  };
  images?: string[];
  imgHero: string;
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
