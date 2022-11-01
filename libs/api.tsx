import database from './database.json'
import type { GlossaryItem, SectionType, ExpressionItem } from '../types'

export const menu = {
  glossary: database.glossary.map((v) => v.type),
  expression: database.expression.map((v) => v.type),
}

const paths = []

database.glossary.forEach((v) => {
  paths.push({
    params: {
      name: 'glossary-' + v.type,
    },
  })
})

database.expression.forEach((v) => {
  paths.push({
    params: {
      name: 'expression-' + v.type,
    },
  })
})

export { paths }

export function getFullPage(section: SectionType, name: string): GlossaryItem[] | ExpressionItem[] {
  // @ts-ignore
  const result = database[section].find((v) => v.type === name)
  return result.content
}
