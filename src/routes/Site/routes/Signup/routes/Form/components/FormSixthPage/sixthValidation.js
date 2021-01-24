import memoize from 'lru-memoize';
import {createValidator, required, requireIf} from 'utils/validation';

const fourthValidation = createValidator({
 social_status:required,
 social_job_status:required,
 social_job:requireIf('social_job_status', 'employed'),
 social_job_start:requireIf('social_job_status', 'employed'),
 social_experience:requireIf('social_job_status', 'employed'),
 social_job_employer:requireIf('social_job_status', 'employed'),
 social_job_type:requireIf('social_job_status', 'employed'),
 social_job_country_id:requireIf('social_job_status', 'employed'),
 social_job_city_id:requireIf('social_job_status', 'employed'),
});

export default memoize(10)(fourthValidation);