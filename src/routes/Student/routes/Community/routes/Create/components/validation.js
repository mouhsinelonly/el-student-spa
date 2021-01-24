import memoize from 'lru-memoize'
import { createValidator, required, maxLength, minLength } from 'utils/validation'

const validation = createValidator({
  subject: [required, minLength(5), maxLength(100)],
  content: [required, minLength(10), maxLength(800)]
})

export default memoize(10)(validation)
