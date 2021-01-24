// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
// import validation rules
import fourthValidation from './fourthValidation'
import MaterialInput from 'components/Form/MaterialInput'
import MaterialRadio from 'components/Form/MaterialRadio'
import Select from 'components/Form/Select'
import { scrollToPosition } from 'utils'

import '../Common.scss'

// form fields

type PropsType = {
  fields: Object,
  handleSubmit: Function,
  countries: Array<Object>,
  contactStates: Array<Object>,
  contactCities: Array<Object>,
  submitFailed: boolean,
  invalid: boolean,
  previousPage: Function,
  getContactStates: Function,
  getContactCities: Function
};

export const fields = [
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
  'emergency_relationship'
]
// import css
// import components

class FormFourthPage extends React.Component<PropsType> {
  static defaultProps = {
    countries: [],
    contactStates: [],
    contactCities: []
  }

  componentDidMount () {
    scrollToPosition(0)
  }
  render (): React.Element<'form'> {
    const {
      fields: { contact_country_id, contact_state_id, contact_region, contact_postalbox,
contact_city_id, contact_email, contact_mobile,
contact_phone, emergency_name, emergency_mobile, emergency_relationship },
      handleSubmit,
      countries,
      submitFailed,
      invalid,
      // previousPage,
      contactCities,
      contactStates
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-signup-common__section'>
          <div className='row'>
            <div className='col-xs-12'>
              <h6 className='p-signup-common__section__heading'>معلومات الإقامة</h6>
            </div>
            <div className='col-xs-12 col-md-6 col-lg-3'>
              <Select isChanged={this.handleContactCountryChanged}
                options={countries}
                data={contact_country_id}
                label='حدد دولة الإقامة' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-3'>
              <Select options={contactCities}
                isChanged={this.handleContactStateChanged}
                data={contact_city_id}
                label='حدد المحافظة' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-3'>
              <Select
                options={contactStates}
                data={contact_state_id}
                label='حدد الولاية' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-3'>
              <MaterialInput label='المنطقة' data={contact_region} />
            </div>
          </div>
          <div className='row p-t-1'>
            <div className='col-xs-12 col-md-4 col-lg-3'>
              <MaterialInput label='صندوق البريد' data={contact_postalbox} />
            </div>
          </div>
          <div className='row p-t-1'>
            <div className='col-xs-12'>
              <h6 className='p-signup-common__section__heading'>معلومات التواصل</h6>
            </div>
            <div className='col-xs-12 col-md-4 col-lg-3'>
              <MaterialInput label='البريد الإلكتروني' data={contact_email} />
            </div>
            <div className='col-xs-12 col-md-4 col-lg-3'>
              <MaterialInput label='هاتف المحمول' data={contact_mobile} />
            </div>
            <div className='col-xs-12 col-md-4 col-lg-3'>
              <MaterialInput label='الهاتف الثابت (إختياري)' data={contact_phone} />
            </div>
          </div>
          <div className='row p-t-2'>
            <div className='col-xs-12 col-md-6'>
              <h6 className='p-signup-common__section__heading'>معلومات شخص للطوارئ</h6>
            </div>
            <div className='col-xs-12 col-md-6'>
              <h6 className='p-signup-common__section__heading'>صلة القرابة:</h6>
            </div>
            <div className='col-xs-12 col-lg-3'>
              <MaterialInput label='إسم الشخص' data={emergency_name} />
            </div>
            <div className='col-xs-12 col-lg-3'>
              <MaterialInput label='هاتفه المحمول' data={emergency_mobile} />
            </div>
            <div className='col-xs-12 col-lg-6'>
              <MaterialRadio value='M' checked={emergency_relationship.value === 'M'}
                label='والد(ة)' data={emergency_relationship} />
              <MaterialRadio value='B' checked={emergency_relationship.value === 'B'}
                label='أخ(ت)' data={emergency_relationship} />
              <MaterialRadio value='F' checked={emergency_relationship.value === 'F'}
                label='عائلة' data={emergency_relationship} />
              <MaterialRadio value='R' checked={emergency_relationship.value === 'R'}
                label='صديق(ة)' data={emergency_relationship} />
              {emergency_relationship.touched && emergency_relationship.error
                ? <div className='p-signup-common__label-danger'>{emergency_relationship.error}</div> : null}
            </div>
          </div>
        </div>
        <footer className='p-signup-common__footer'>
          <div className='col-xs-12 text-xs-center'>
            <a onClick={this._goToPrevious} className='p-signup-common__goto-previous'>
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

  _goToPrevious = () => {
    const { previousPage } = this.props
    previousPage()
  }
  handleContactCountryChanged = (e: Object) => {
    this.props.getContactCities(e.target.value)
  }

  handleContactStateChanged = (e: Object) => {
    this.props.getContactStates(e.target.value)
  }
}

export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: fourthValidation,
  destroyOnUnmount: false
})(FormFourthPage)
