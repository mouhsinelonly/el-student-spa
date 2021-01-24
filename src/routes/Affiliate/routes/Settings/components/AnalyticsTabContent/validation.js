import memoize from 'lru-memoize'
import { createValidator, minLength } from 'utils/validation'

const validation = createValidator({
  ga_id: [minLength(6)]
})

export default memoize(10)(validation)
