import database from './database.json'
import { PAGE_SIZE } from '../shared/constant'

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

export function getFirstPage(name: string) {
  const result = database.glossary.find((v) => v.type === name)
  return result.content.slice(0, PAGE_SIZE)
}

export function getFullPage(category: string, name: string) {
  const result = database[category].find((v) => v.type === name)
  return result.content
}
