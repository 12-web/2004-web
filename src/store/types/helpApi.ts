export type GetHelpArgs = {
  pageType: 'help' | 'about'
}

type TextType = {
  value: string | null
  url: string | null
}

export type InfoBlockProps = {
  sequenceNumber: number
  heading: TextType | null
  texts: TextType[] | null
  pictureUrl: string | null
  type: 'sectionPicture' | 'sectionText'
}

export type GetHelpResponse = {
  heading: string | null
  items: InfoBlockProps[]
}
