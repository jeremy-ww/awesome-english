import axios from 'axios'
import fs from 'fs'
import prettier from 'prettier'
import database from '../libs/database.json' assert { type: 'json' }
import addContent from './add.json' assert { type: 'json' }
import _ from 'lodash'

const glossary = _.keyBy(database.glossary, 'type')

async function get(type, word) {
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
      const usPhonetics = `[${data.ec.word.usphone}]`
      const ukPhonetics = `[${data.ec.word.ukphone}]`
      const item = {
        word,
        origin: [`https://dict.youdao.com/dictvoice?audio=${word}&type=2`],
        phonetics: [data.ec.word.usphone],
        reference: '',
      }
      if (usPhonetics !== ukPhonetics) {
        item.phonetic.push(data.ec.word.ukphone)
      }
      glossary[type].content.unshift(item)
      console.log('Finished adding:', word)
    } catch (e) {
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
  console.log(database.glossary[0].content)
})
