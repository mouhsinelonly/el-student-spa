import memoize from 'lru-memoize'
import { createValidator, minLength, required, integer } from 'utils/validation'

const validation = createValidator({
  name: [required, minLength(6)],
  bank_name: [required, minLength(6)],
  country_id: [required, minLength(6)],
  iban: [required, integer, minLength(6)],
})

export default memoize(10)(validation)
