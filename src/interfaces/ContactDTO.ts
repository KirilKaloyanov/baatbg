export interface ContactDTO {
  phone?: string;
  email?: string;
  site?: string;
  community:{
    bg: string;
    en: string;
  };
  address?: {
    bg: string;
    en: string;
  };
}