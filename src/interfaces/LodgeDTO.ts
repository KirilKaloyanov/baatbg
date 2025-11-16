export interface LodgeDTO {
    id: string;
    community: {
        bg: string;
        en: string;
    }
    name: {
        bg: string;
        en: string;
    };
    memberId: string;
    regionId: string;
    address: {
        bg: string;
        en: string;
    };
    phone: string;
    email: string;
    website: string;
    location: {
        lat: number;
        lng: number;
    };
    images: string[];
    imgHero: string;
    text: {
        bg: string[];
        en: string[];
    };
}