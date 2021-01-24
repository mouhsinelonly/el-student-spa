const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) =>
  rules.map(rule => rule(value, data)).filter(error => !!error)[ 0 ]

export const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    data.map((n, i) => !data[i][name] ? (errors[name] = 'مطلوب') : null)

    return errors
  }, {})

export function email (value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'بريد إلكتروني غير صحيح'
  }
}

export function date (value) {
  if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    return 'التاريخ الذي ادخلته غير صحيح'
  }
}

export function english (value) {
  if (!/^[\sA-Za-z0-9\-]*$/.test(value)) {
    return 'هذا الحقل يقبل حروف إنجليزية فقط'
  }
}

export function alphanum (value) {
  if (!/^[\sA-Za-z0-9]*$/.test(value)) {
    return 'هذا الحقل يقبل حروف إنجليزية و أرقام فقط'
  }
}

export function arabic (value) {
  if (!/^[\s\u0600-\u06FF0-9]*$/.test(value) && value !== '' && typeof value !== 'undefined') {
    return 'هذا الحقل يقبل حروف عربية فقط'
  }
}

export function required (value) {
  if (isEmpty(value)) {
    return 'مطلوب'
  }
}

export function minLength (min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `يجب أن يكون على الأقل ${min} حرفا`
    }
  }
}

export function float (value) {
  if (!/^\d*\.?\d{0,2}$/.test(value)) {
    return 'يجب إدخال عدد عشري صحيح'
  }
}
export function maxLength (max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `يجب أن لا يتجاوز ${max} حرفا`
    }
  }
}

export function integer (value) {
  if (!Number.isInteger(Number(value)) && value !== '' && typeof value !== 'undefined') {
    return 'يجب أن يكون عدد صحيح'
  }
}

export function oneOf (enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `يجب أن يكون واحد من الاتي: ${enumeration.join(', ')}`
    }
  }
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'لا يتوافق'
      }
    }
  }
}

export function requireIf (field, fieldValue) {
  return (value, data) => {
    if (data) {
      if ((data[field] === fieldValue) && !value) {
        return 'ضروري'
      }
    }
  }
}

export function requireIfNot (field, fieldValue) {
  return (value, data) => {
    if (data) {
      if (((data[field] !== fieldValue) && !value) && data[field]) {
        return 'ضروري'
      }
    }
  }
}

export function createValidator (rules) {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)

      if (error) {
        errors[key] = error
      }
    })

    return errors
  }
}
