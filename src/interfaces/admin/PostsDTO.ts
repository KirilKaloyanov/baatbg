export interface PostsMetaDTO {
    heading: {
        bg: string,
        en: string,
    }
    menuPath: string,
    subMenuPath: string,
    id: string
}

export interface PostsDTO extends PostsMetaDTO {
    text: {
        bg: string,
        en: string
    }
}
