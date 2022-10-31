import database from '../../../libs/database.json'
import type { Category } from '../../../types/index'
import { PAGE_SIZE } from '../../../shared/constant'
import _ from 'lodash'

const indexedDatabase: Record<string, Category> = _.keyBy(database.glossary, 'type')

export default async function getContentById (req, res) {
  const { category } = req.query
  const pageNo = parseInt(req.query.pageNo)
  if (indexedDatabase.hasOwnProperty(category)) {
    const content = indexedDatabase[category].content.slice(
      pageNo * PAGE_SIZE,
      (pageNo + 1) * PAGE_SIZE,
    )
    res.json({
      content,
      pageNo
    })
  } else {
    res.status(400).json({ message: 'Invalid category' })
  }
}