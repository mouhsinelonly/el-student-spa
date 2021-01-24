import memoize from 'lru-memoize'

function isFloat (n) {
  return Number(n) === n && n % 1 !== 0
}

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'ضروري'
    }

    if (name == 'degree_score' && (!isFloat(Number(data[name])) && !Number.isInteger(Number(data[name])))) {
      errors[name] = 'هذا الحقل يقبل فقط ارقام'
    }

    return errors
  }, {})
const validateChild = requireFields(
  'degree_name',
  'degree_speciality',
  'degree_institution',
  'degree_graduation_year',
  'degree_score',
  'degree_country_id')
const validateDeepForm = data => {
  const errors = {}
  if (!data.speciality_experience) {
    errors.speciality_experience = 'ضروري'
  }
  errors.degrees = data.degrees.map(validateChild)
  return errors
}

export default memoize(10)(validateDeepForm)
