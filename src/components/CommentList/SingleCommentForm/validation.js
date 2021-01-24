import memoize from 'lru-memoize'
import { createValidator, required, maxLength } from 'utils/validation'

const validation = createValidator({
  content: [required, maxLength(800)]
})

export default memoize(10)(validation)
