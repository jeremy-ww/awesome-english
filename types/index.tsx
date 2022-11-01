export interface GlossaryItem {
  word: string
  origin: string[]
  phonetics: string[]
  reference: string
}

export interface ExpressionItem {
  sentence: string
  explanation?: string
}

export interface Category {
  type: string
  content: GlossaryItem[]
}

export interface Menu {
  glossary: string[]
  expression: string[]
}

export type SectionType = 'glossary' | 'expression'
