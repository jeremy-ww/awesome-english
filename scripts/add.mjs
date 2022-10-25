import axios from 'axios'
import fs from 'fs'
import prettier from 'prettier'
import database from '../libs/database.json' assert { type: 'json' }
import addContent from './add.json' assert { type: 'json' }
import _ from 'lodash'
import https from 'https'

const glossary = _.keyBy(database.glossary, 'type')

function download(word) {
  return new Promise((resolve) => {
    https
      .get(`https://dict.youdao.com/dictvoice?audio=${word}&type=2`, (res) => {
        const path = `./public/audios/${word.replace('.', 'dot-')}.mp3`
        const filePath = fs.createWriteStream(path)
        res.pipe(filePath)
        filePath.on('finish', () => {
          filePath.close()
          resolve(true)
        })
      })
      .on('error', () => {
        resolve(false)
      })
  })
}

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
      const isSuccess = await download(word)
      const item = {
        word,
        origin: isSuccess ? [`/audios/${word}.mp3`] : [],
        phonetics: [usPhonetics],
        reference: '',
      }
      if (usPhonetics !== ukPhonetics) {
        item.phonetics.push(ukPhonetics)
      }
      glossary[type].content.unshift(item)
      glossary[type].content = _.uniqBy(glossary[type].content, 'word')
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
