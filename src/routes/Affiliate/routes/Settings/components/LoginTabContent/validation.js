import memoize from 'lru-memoize'
import { createValidator, minLength, email } from 'utils/validation'

const validation = createValidator({
  email: [minLength(6), email],
  mobile: [minLength(6)]
})

export default memoize(10)(validation)
