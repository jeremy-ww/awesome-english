export interface Item {
  word: string
  origin: string[]
  phonetic: string[]
  reference: string
}

export interface Category {
  type: string
  content: Item[]
}

export interface Menu {
  glossary: string[]
  expression: string[]
}
