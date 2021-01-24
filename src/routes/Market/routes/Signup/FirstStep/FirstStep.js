// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'

import MaterialInput from 'components/Form/MaterialInput'
import Select from 'components/Form/Select'
import MaterialDate from 'components/Form/MaterialDate'
import MaterialRadio from 'components/Form/MaterialRadio'
import validation from './validation'

type PropsType = {
  fields: Object,
  invalid: boolean,
  currentStep: number,
  countries: Array<Object>,
  handleSubmit: Function
};
const fields = ['birthdate', 'name', 'nationality_id', 'contact_email', 'mobile', 'gender']

const FirstStep = (props: PropsType): React.Element<'form'> => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className='Library-Signup__inputs p-a-3'>
        <label className='font-weight-bold p-y-1'>اسمك الكامل</label>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <MaterialInput data={props.fields.name} label='الاسم الكامل' />
          </div>
        </div>
        <label className='font-weight-bold p-y-1'>الجنسية</label>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <Select data={props.fields.nationality_id} options={props.countries} label='الجنسية' />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <label className='font-weight-bold p-y-1'>تاريخ الميلاد</label>
            <MaterialDate data={props.fields.birthdate} label='تاريخ الميلاد' />
          </div>
          <div className='col-xs-12 col-md-4'>
            <label className='font-weight-bold p-y-1'>الجنس</label>
            <br />
            <MaterialRadio value='m' checked={props.fields.gender.value === 'm'}
              label='ذكر'
              data={props.fields.gender} />
            <MaterialRadio value='f' checked={props.fields.gender.value === 'f'}
              label='أنثى'
              data={props.fields.gender} />
            {props.fields.gender.touched && props.fields.gender.error &&
              <div className='p-signup-common__label-danger'>{props.fields.gender.error}</div>}
          </div>
        </div>
        <label className='font-weight-bold p-y-1'>معلومات التواصل</label>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <MaterialInput data={props.fields.contact_email} label='البريد الالكتروني' />
          </div>
          <div className='col-xs-12 col-md-4'>
            <MaterialInput data={props.fields.mobile} label='رقم الهاتف' />
          </div>
        </div>
      </div>
      <div className='Library-Signup__footer text-xs-center p-y-3 m-b-3'>
        <button className={`btn Library-Signup__footer-back ${props.currentStep < 2 ? 'hidden-xs-up' : ''}`}>
          الرجوع للسابق
        </button>
        <button className='btn btn-success p-x-3 btn-lg' disabled={props.invalid}>
          {props.currentStep === 1 ? 'التالي' : 'تسجيل'}
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'librarysignup',
  fields: fields,
  validate: validation,
  destroyOnUnmount: false
})(FirstStep)
