import memoize from 'lru-memoize'
import { createValidator, required, maxLength, arabic, english, date, requireIf } from 'utils/validation'

const secondValidation = createValidator({
  academystructure_specialty_id: [required],
  registration_type_id: [requireIf('degreeType', 'bac')],
  first_name: [required, arabic, maxLength(20)],
  second_name: [required, arabic, maxLength(20)],
  third_name: [required, arabic, maxLength(20)],
  fourth_name: [arabic, maxLength(20)],
  last_name: [required, arabic, maxLength(20)],
  first_name_latin: [english, required, maxLength(20)],
  second_name_latin: [english, required, maxLength(20)],
  third_name_latin: [english, required, maxLength(20)],
  fourth_name_latin: [english, maxLength(20)],
  last_name_latin: [english, required, maxLength(20)],
  birthday: [required, date],
  gender: required
})

export default memoize(10)(secondValidation)
