import Case from 'case'
import pkg from '../package.json'

const metadata = {
  name: Case.capital(pkg.name),
  description: pkg.description,
  url: pkg.homepage,
}

export default metadata
