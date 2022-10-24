import axios from 'axios'
import fs from 'fs'
import prettier from 'prettier'
import database from '../libs/database.json' assert { type: 'json' }
import addContent from './add.json' assert { type: 'json' }
import _ from 'lodash'

const glossary = _.keyBy(database.glossary, 'type')

async function get(type, word) {
  if (!(type in glossary)) {
    glossary[type] = {
      type,
      content: [],
    }
    database.glossary.push(glossary[type])
  }

  const existedWord = glossary[type].content.find((v) => v.word === word)
  if (existedWord) {
    return
  }

  try {
    const data = await axios
      .get(
        `https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4&q=${word}&le=en&t=6&client=web&keyfrom=webdict`,
      )
      .then((response) => response.data)
    try {
      const usPhonetics = `[${data.ec?.word?.usphone ?? 'TBD'}]`
      const ukPhonetics = `[${data.ec?.word?.ukphone ?? 'TBD'}]`
      const item = {
        word,
        origin: [`https://dict.youdao.com/dictvoice?audio=${word}&type=2`],
        phonetics: [usPhonetics],
        reference: '',
      }
      if (usPhonetics !== ukPhonetics) {
        item.phonetics.push(ukPhonetics)
      }
      glossary[type].content.unshift(item)

      glossary[type].content.sort((a, b) => a.word.localeCompare(b.word))

      console.log('Finished adding:', word)
    } catch (e) {
      console.log(e)
      console.log('Parse phonetics error', word)
    }
  } catch (e) {
    console.log('Download error', e.message)
  }
}

const promises = []

addContent?.glossary?.forEach((category) => {
  category?.content.forEach((word) => {
    promises.push(get(category.type, word))
  })
})

Promise.all(promises).then(() => {
  fs.writeFileSync(
    './libs/database.json',
    prettier.format(JSON.stringify(database), {
      useTabs: true,
      parser: 'json',
      printWidth: 30,
    }),
  )
})
