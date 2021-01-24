import memoize from 'lru-memoize'
import { createValidator, required, maxLength } from 'utils/validation'

const validation = createValidator({
  subject: [required, maxLength(100)],
  content: [required, maxLength(800)]
})

export default memoize(10)(validation)
