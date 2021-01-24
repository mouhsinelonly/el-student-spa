import memoize from 'lru-memoize';
import {float} from 'utils/validation'

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'مطلوب'
    }
    
    return errors
  }, {})
const validateChild = requireFields('id')
const validateDeepForm = data => {

  const errors = {}
  if (!data.university) {
    errors.university = 'ضروري'
  }
  if (!data.grade) {
    errors.grade = 'ضروري'
  }

  if(float(data.grade))
  errors.grade = float(data.grade)
  
  if (!data.level) {
    errors.level = 'ضروري'
  }
  
  errors.files = data.files.map(validateChild)

  
  return errors
}

export default memoize(10)(validateDeepForm)