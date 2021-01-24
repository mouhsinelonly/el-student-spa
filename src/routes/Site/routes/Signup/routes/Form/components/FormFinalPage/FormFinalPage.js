import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { scrollToPosition } from 'utils'
// import validation rules
import finalValidation from './finalValidation'
// form fields
import '../Common.scss'
import MaterialInput from 'components/Form/MaterialInput'

export const fields = [
  'affiliate_code',
  'affiliate_registration_type',
  'password',
  'degreeType',
  'academystructure_specialty_id',
  'registration_type_id',
  'first_name',
  'second_name',
  'third_name',
  'fourth_name',
  'last_name',
  'first_name_latin',
  'second_name_latin',
  'third_name_latin',
  'fourth_name_latin',
  'last_name_latin',
  'birthday',
  'gender',
  'nationality_type',
  'nationality_country_id',
  'birth_country_id',
  'nationality_state_id',
  'nationality_city_id',
  'stay_type',
  'passeport_number',
  'passeport_issued',
  'passeport_expire',
  'passeport_country_id',
  'stay_expire',
  'contact_country_id',
  'contact_state_id',
  'contact_region',
  'contact_postalbox',
  'contact_city_id',
  'national_id',
  'contact_email',
  'contact_mobile',
  'contact_phone',
  'emergency_name',
  'emergency_mobile',
  'emergency_relationship',
  'degrees[].degree_name',
  'degrees[].degree_speciality',
  'degrees[].degree_institution',
  'degrees[].degree_graduation_year',
  'degrees[].degree_score',
  'degrees[].degree_country_id',
  'speciality_experience',
  'social_status',
  'social_job_status',
  'social_job',
  'social_job_start',
  'social_experience',
  'social_job_employer',
  'social_job_type',
  'social_job_country_id',
  'social_job_city_id',
  'health_status',
  'health_disabled_type',
  'health_disabled_size',
  'computer_skills',
  'internet_skills',
  'internet_link',
  'cyber_cafe',
  'computer_availability'
]

// import css
// import classes from './FormFinalPage.scss'
// import components

class FormFinalPage extends Component {
  constructor (props) {
    super(props)

    this._previousPage = this._previousPage.bind(this)
  }
  componentDidMount () {
    scrollToPosition(0)
  }
  render () {
    const {
      reserrors,
    fields: { password },
      handleSubmit,
      invalid
    } = this.props
    const haserrors = Object.getOwnPropertyNames(reserrors).length !== 0

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-signup-common__section'>
          <div className='row'>
            <div className='col-xs-12 col-md-6 col-md-pull-3 col-lg-6 col-lg-pull-3'>
              <h1 className='p-b-2 text-xs-center'>
                أدخل <b>كلمة المرور</b> التي ترغب في استخدامها لدخول البوابة بمركز التعلم عن بعد
              </h1>
            </div>
            <div className='clearfix' />
            <div className='col-xs-12 col-md-6 col-md-pull-3 col-lg-4 col-lg-pull-4'>
              <MaterialInput data={password} type='password' label='كلمة المرور' />
            </div>
          </div>
          <div className='col-xs-12 text-xs-center m-t-3'>
            {haserrors && <button type='button' onClick={this._previousPage}
              className='p-signup-common__cta btn btn-primary btn-lg p-x-3 m-l-2'>
                  الصفحة السابقة
            </button>
            }
            <button disabled={invalid} type='submit' className='p-signup-common__cta btn btn-success btn-lg p-x-3'>
                {haserrors ? 'أرسل من جديد' : 'تسجيل و إنهاء'}
            </button>
          </div>
          <div className='col-xs-12 col-md-6 col-md-pull-3'>
              {haserrors && <div className='alert alert-danger m-t-3'>{Object.keys(reserrors).map((k) => {
                return reserrors[k].map((v, i) => {
                  return <li key={i}>
                  {v}
                  </li>
                })
              })}</div>}
          </div>
        </div>
      </form>
    )
  }
  _previousPage () {
    const { previousPage } = this.props
    previousPage()
  }
}

FormFinalPage.propTypes = {
  reserrors: PropTypes.object,
  fields: PropTypes.object.isRequired,
  invalid: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func
}

export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: finalValidation,
  destroyOnUnmount: false
})(FormFinalPage)
