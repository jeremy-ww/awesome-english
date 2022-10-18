import Case from 'case'

export default {
  name: Case.capital(require('../package.json').name),
  description: require('../package.json').description,
}
