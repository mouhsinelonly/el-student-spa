import memoize from 'lru-memoize'
import {createValidator, required} from 'utils/validation'

const validation = createValidator({
  subject_id: [required]
})

export default memoize(10)(validation)
