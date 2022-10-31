import database from '../../../libs/database.json'
import _ from 'lodash'

const indexedDatabase = _.keyBy(database.glossary, 'type')

export default async function getContentById (req, res) {
  const { category, pageNo } = req.query
  if (indexedDatabase.hasOwnProperty(category)) {
    const data = indexedDatabase[category].content.slice(pageNo * 10, (pageNo + 1) * 10)
    res.json(data)
  } else {
    res.status(400).json({ message: 'Invalid category' })
  }
}