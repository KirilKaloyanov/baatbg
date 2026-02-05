import LocalizedString from "./LocalizedString"

export interface PostMetaDTO {
    heading: LocalizedString
    menuPath: string,
    position: number,
    subMenuPath: string,
    id: string,
    linkVideo: string
}

export interface PostDTO extends PostMetaDTO {
    text: LocalizedString
}
