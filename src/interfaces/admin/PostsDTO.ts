export interface PostMetaDTO {
    heading: {
        bg: string,
        en: string,
    }
    menuPath: string,
    position: number,
    subMenuPath: string,
    id: string,
    linkVideo: string
}

export interface PostDTO extends PostMetaDTO {
    text: {
        bg: string,
        en: string
    }
}
