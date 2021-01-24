import memoize from 'lru-memoize'
import {createValidator, required} from 'utils/validation'

const validation = createValidator({
  body: [required],
  ticketId: [required]
})

export default memoize(10)(validation)
