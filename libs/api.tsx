const database = require('./database.json')

export const menu = database['A'].map((v) => v.word)
