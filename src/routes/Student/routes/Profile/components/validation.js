import memoize from 'lru-memoize'
import {createValidator, required, maxLength, minLength} from 'utils/validation'

const validation = createValidator({
  password: [required, minLength(8), maxLength(16)]
})

export default memoize(10)(validation)
