import memoize from 'lru-memoize';
import {integer} from 'utils/validation'

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'مطلوب'
    }
    
    return errors
  }, {})
const validateChild = requireFields('name')
const validateDeepForm = data => {

  const errors = {}
  
  errors.subjects = data.subjects.map(validateChild)

  
  return errors
}

export default memoize(10)(validateDeepForm)