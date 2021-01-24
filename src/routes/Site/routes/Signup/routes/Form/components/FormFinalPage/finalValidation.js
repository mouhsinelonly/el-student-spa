import memoize from 'lru-memoize';
import {createValidator, required, email, minLength, maxLength} from 'utils/validation';

const finalValidation = createValidator({
  	// email:[required, email],
	password:[required, minLength(6), maxLength(16)]
});

export default memoize(10)(finalValidation);