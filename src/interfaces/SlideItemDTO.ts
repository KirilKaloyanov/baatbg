import LocalizedString from "./LocalizedString";

export interface SlideItemDTO {
    id: string;
    img: string;
    link: string;
    title: LocalizedString;
    text: LocalizedString;
    position: number;
    buttonText?: LocalizedString
}