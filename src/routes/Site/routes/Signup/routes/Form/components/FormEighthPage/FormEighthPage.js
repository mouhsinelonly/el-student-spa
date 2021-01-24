import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { scrollToPosition } from 'utils'
// import validation rules
import eighthValidation from './eighthValidation'
// form fields

export const fields = [
  'computer_skills',
  'internet_skills',
  'internet_link',
  'cyber_cafe',
  'computer_availability'
]

// import css
import '../Common.scss'
// import classes from './FormEighthPage.scss'
// import components
import MaterialRadio from 'components/Form/MaterialRadio'

class FormEighthPage extends Component {
  componentDidMount () {
    scrollToPosition(0)
  }
  render () {
    const {
      fields: {computer_skills, internet_skills, internet_link, cyber_cafe, computer_availability},
      handleSubmit,
      invalid,
      submitFailed,
      previousPage
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-signup-common__section p-b-3'>
          <div className='row'>
            <div className='col-xs-12 col-md-4'>
              <h6 className='p-signup-common__section__heading'>القدرة على إستخدام الحاسب</h6>
              <MaterialRadio value='good' checked={computer_skills.value === 'good'}
                label='جيد'
                data={computer_skills} />
              <MaterialRadio value='low' checked={computer_skills.value === 'low'}
                label='متوسط'
                data={computer_skills} />
              <MaterialRadio value='very_low'
                checked={computer_skills.value === 'very_low'}
                label='ضعيف'
                data={computer_skills} />
              {computer_skills.touched && computer_skills.error &&
                <div className='p-signup-common__label-danger'>{computer_skills.error}</div>}
            </div>
            <div className='col-xs-12 col-md-5'>
              <h6 className='p-signup-common__section__heading'>القدرة على إستخدام الأنترنت</h6>
              <MaterialRadio value='good' checked={internet_skills.value === 'good'} label='جيد' data={internet_skills} />
              <MaterialRadio value='low' checked={internet_skills.value === 'low'} label='متوسط' data={internet_skills} />
              <MaterialRadio value='very_low' checked={internet_skills.value === 'very_low'} label='ضعيف' data={internet_skills} />
                {internet_skills.touched && internet_skills.error && <div className='p-signup-common__label-danger'>{internet_skills.error}</div>}
              </div>
              </div>
              <div className='row p-t-2'>
              <div className='col-xs-12 col-md-4'>
                <h6 className='p-signup-common__section__heading'>توفر جهاز كمبيوتر أو لاب بحالة جيدة</h6>
                <MaterialRadio value='1' checked={computer_availability.value === '1'} label='يوجد' data={computer_availability} />
                <MaterialRadio value='0' checked={computer_availability.value === '0'} label='لا يوجد' data={computer_availability} />
                {computer_availability.touched && computer_availability.error && <div className='p-signup-common__label-danger'>{computer_availability.error}</div>}
              </div>
              <div className='col-xs-12 col-md-3'>
                <h6 className='p-signup-common__section__heading'>توفر ربط بالأنترنت</h6>
                <MaterialRadio value='1' checked={internet_link.value === '1'} label='يوجد' data={internet_link} />
                <MaterialRadio value='0' checked={internet_link.value === '0'} label='لا يوجد' data={internet_link} />
                {internet_link.touched && internet_link.error && <div className='p-signup-common__label-danger'>{internet_link.error}</div>}
              </div>
               <div className='col-xs-12 col-md-5'>
                <h6 className='p-signup-common__section__heading'>توفر مقهى أنترنت قريب من محل إقامتك:</h6>
                <MaterialRadio value='1' checked={cyber_cafe.value === '1'} label='يوجد' data={cyber_cafe} />
                <MaterialRadio value='0' checked={cyber_cafe.value === '0'} label='لا يوجد' data={cyber_cafe} />
                {cyber_cafe.touched && cyber_cafe.error && <div className='p-signup-common__label-danger'>{cyber_cafe.error}</div>}
              </div>
            </div>
            </div>

         <footer className='p-signup-common__footer'>
           <div className='col-xs-12 text-xs-center'>
              <a onClick={()=>previousPage()} className='p-signup-common__goto-previous'>
                الرجوع للسابق
              </a>
               {submitFailed && invalid &&
              <div className='text-danger p-a-3'>
                <i className='material-icons'>warning</i> <br />
              يوجد بيانات لم تقم بادخالها</div>}
              <button type='submit' className='p-signup-common__cta btn btn-success btn-lg p-x-3'>
                التالي
              </button>
            </div>
           </footer>

       </form>
    )
  }

}

FormEighthPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}


export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: eighthValidation,
  destroyOnUnmount: false
})(FormEighthPage)