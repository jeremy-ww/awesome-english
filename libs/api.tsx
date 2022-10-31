import database from './database.json'

export const menu = {
  glossary: database.glossary.map((v) => v.type),
  expression: database.expression.map((v) => v.type),
}

const paths = []

database.glossary.forEach((v) => {
  paths.push({
    params: {
      category: v.type,
    },
  })
})

export { paths }

export function getInfoByCategory(category: string) {
  const result = database.glossary.find((v) => v.type === category)
  return {
    dataLength: result.content.length,
  }
}

export function getFirstPage(category: string) {
  const result = database.glossary.find((v) => v.type === category)
  return result.content.slice(0, 10)
}
