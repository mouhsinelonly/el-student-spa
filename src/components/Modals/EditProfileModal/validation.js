import memoize from 'lru-memoize'
import {createValidator, required, integer, email} from 'utils/validation'

const validation = createValidator({
  contact_mobile: [required, integer],
  contact_email: [required, email]
})

export default memoize(10)(validation)
