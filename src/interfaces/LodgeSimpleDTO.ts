export interface LodgeSimpleDTO { 
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