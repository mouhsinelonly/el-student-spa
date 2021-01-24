import memoize from 'lru-memoize'
import { createValidator, required, email, minLength, maxLength, integer } from 'utils/validation'

const validation = createValidator({
  password: [minLength(6)],
  mobile: [required, integer, minLength(8), maxLength(16)]
})

export default memoize(10)(validation)
