import memoize from 'lru-memoize'
import { minLength, email, required, createValidator, maxLength } from 'utils/validation'

const validation = createValidator({
  email: [required, email],
  password: [required, minLength(6), maxLength(30)]
})

export default memoize(10)(validation)
