export interface Chapter {
  number: number
  slug: string
  title: string
  summary: string
  keyArguments: string[]
  relatedFigures: string[]
  wordCount: number
}

export interface Figure {
  number: string
  slug: string
  caption: string
  image: string
  context: string
  chapter: number
  theme: 'territory' | 'economy' | 'inequality' | 'trust'
  source?: string
}

export interface Author {
  name: string
  bio: string
  deceased?: boolean
  dateOfDeath?: string
}

export interface Quote {
  quote: string
  context: string
  chapter: string
  theme: string
}

export interface BookMetadata {
  title: string
  subtitle: string
  authors: Author[]
  publisher: string
  publicationDate: string
  coreThesis: string
  keyThemes: string[]
}
