import memoize from 'lru-memoize';
import {createValidator, required, requireIf} from 'utils/validation';

const seventhValidation = createValidator({
  health_status:required,
  health_disabled_type:requireIf("health_status", 0),
  health_disabled_size:requireIf("health_status", 0)
});

export default memoize(10)(seventhValidation);