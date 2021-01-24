import memoize from 'lru-memoize'

const requireFields = (...files) => data =>
  files.reduce((errors, id) => {
    if (!data[id]) {
      errors[id] = 'ضروري'
    }

    return errors
  }, {})
const validateChild = requireFields(
  'id',
  'preview'
  )

const validateDeepForm = data => {
  const errors = {}

  if (!data.reason) {
    errors.reason = 'ضروري'
  }
  if (!data.bank_name) {
    errors.bank_name = 'ضروري'
  }
  if (!data.bank_account_name) {
    errors.bank_account_name = 'ضروري'
  }
  if (!data.bank_account_number) {
    errors.bank_account_number = 'ضروري'
  }

  errors.files = data.files.map(validateChild)
  return errors
}

export default memoize(10)(validateDeepForm)
