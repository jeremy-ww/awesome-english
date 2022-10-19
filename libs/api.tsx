import database from './database.json'

export const menu = {
  glossary: database.glossary.map((v) => v.type),
  expression: database.expression.map((v) => v.type),
}

const flatGlossaryContent = database.glossary.flatMap((v) => v.content)

const paths = []

database.glossary.forEach((v) => {
  v.content.forEach((v) => {
    paths.push({
      params: {
        word: v.word,
      },
    })
  })
})

export { paths }

export function getContentById(word: string) {
  return flatGlossaryContent.find((v) => v.word === word)
}
