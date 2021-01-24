import memoize from 'lru-memoize'
import { createValidator, minLength, required, integer, maxLength } from 'utils/validation'

const eighthValidation = createValidator({
  student_comment: [required, minLength(30), maxLength(1000)],
  exam_id: [required, integer]
})

export default memoize(10)(eighthValidation)
