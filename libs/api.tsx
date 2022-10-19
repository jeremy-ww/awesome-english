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

export function getContentById(category: string) {
  return database.glossary.find((v) => v.type === category)
}
