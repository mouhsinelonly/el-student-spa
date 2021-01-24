import memoize from 'lru-memoize'
import { createValidator, required, maxLength, date, integer, arabic, english } from 'utils/validation'

const validation = createValidator({
  first_name_latin: [required, english, maxLength(100)],
  second_name_latin: [required, english, maxLength(100)],
  third_name_latin: [required, english, maxLength(100)],
  last_name_latin: [required, english, maxLength(100)],
  first_name: [required, arabic, maxLength(100)],
  second_name: [required, arabic, maxLength(100)],
  third_name: [required, arabic, maxLength(100)],
  last_name: [required, arabic, maxLength(100)],
  birthday: [required, date],
  nationality_country_id: [required, integer]
})

export default memoize(10)(validation)
