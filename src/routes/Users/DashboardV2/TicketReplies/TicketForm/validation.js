import memoize from 'lru-memoize'
import { createValidator, required } from 'utils/validation'

const validation = createValidator({
  ticket_id: [required],
  body: [required]
})

export default memoize(10)(validation)
