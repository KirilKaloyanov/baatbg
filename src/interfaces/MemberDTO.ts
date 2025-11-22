export interface MemberDTO {
  id: string;
  typeId: string;
  memberId: string;
  name: {
    bg: string;
    en: string;
  };
  description: {
    bg: string;
    en: string;
  };
  address?: {
    bg: string;
    en: string;
  };
  website?: string;
  phone?: string;
  email?: string;
  img?: string;
}

export interface MemberWithTypeDTO extends MemberDTO {
  typeLabel: {
    label: {
      bg: string,
      en: string
    }
  }
}

export interface MemberTypeDTO {
  id: string;
  label: {
    en: string;
    bg: string;
  };
}
