import memoize from 'lru-memoize'
import { createValidator, required, minLength, email, integer } from 'utils/validation'

const fourthValidation = createValidator({
  contact_country_id: [required],
  contact_state_id: [required],
  contact_region: [required],
  contact_city_id: [required],
  national_id: [required],
  contact_email: [required, email],
  contact_mobile: [required, integer, minLength(8)],
  contact_phone: [integer],
  emergency_name: [required],
  emergency_mobile: [required],
  emergency_relationship: [required]
})

export default memoize(10)(fourthValidation)
