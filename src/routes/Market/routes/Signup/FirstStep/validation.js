import memoize from 'lru-memoize'
import { createValidator, required, maxLength, date, oneOf, integer, email } from 'utils/validation'

const validation = createValidator({
  name: [required, maxLength(100)],
  birthdate: [required, date],
  gender: [required, oneOf(['f', 'm'])],
  nationality_id: [required, integer],
  contact_email: [required, email],
  mobile: [required, integer]
})

export default memoize(10)(validation)
