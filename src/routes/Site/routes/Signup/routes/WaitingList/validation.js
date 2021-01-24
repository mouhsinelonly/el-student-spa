// @flow
import memoize from 'lru-memoize'
import { createValidator, required, requireIf, email } from 'utils/validation'

const thirdValidation = createValidator({
  name: [required],
  email: [email, requireIf('mobile', '')],
  mobile: [requireIf('email', '')]
})

export default memoize(10)(thirdValidation)
