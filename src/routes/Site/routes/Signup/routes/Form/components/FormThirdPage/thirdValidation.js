import memoize from 'lru-memoize';
import {createValidator, required,  date, requireIf, alphanum, requireIfNot} from 'utils/validation';

const thirdValidation = createValidator({
  nationality_type: [required],
  nationality_country_id: [requireIf("nationality_type", 'E')],

  stay_type: [requireIf("nationality_type", 'E')],
  passeport_number: [alphanum, requireIfNot("stay_type", 'non_resident')],
  passeport_issued: [requireIfNot("stay_type", 'non_resident')],
  passeport_expire: [requireIfNot("stay_type", 'non_resident')],
  passeport_country_id: [requireIfNot("stay_type", 'non_resident')],
  stay_expire: [requireIfNot("stay_type", 'non_resident')],

  birth_country_id: [required],
  nationality_state_id: [requireIf("nationality_type", 'O')],
  nationality_city_id: [requireIf("nationality_type", 'O')],
  national_id: [required, alphanum]
});

export default memoize(10)(thirdValidation);