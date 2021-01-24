import memoize from 'lru-memoize'
import {createValidator, required, maxLength, minLength} from 'utils/validation'

const validation = createValidator({
  content: [required, minLength(10), maxLength(800)]
})

export default memoize(10)(validation)
