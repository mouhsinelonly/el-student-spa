import memoize from 'lru-memoize';
import {createValidator, required, float, integer} from 'utils/validation';

const validation = createValidator({
  name:required,
  hours:[required, integer],
  code:required,
  score:[float, required],
  score_total:[float, required]
});

export default memoize(10)(validation);