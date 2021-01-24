import memoize from 'lru-memoize'
import { createValidator, required } from 'utils/validation'

const eighthValidation = createValidator({
  computer_skills:required,
  internet_skills:required,
  internet_link:required,
  cyber_cafe:required,
  computer_availability:required,
})

export default memoize(10)(eighthValidation)
