// @flow
import * as React from 'react'
import MaterialInput from 'components/Form/MaterialInput'
import { reduxForm } from 'redux-form'
import validation from './validation'

type PropsType = {
  fields: Object,
  signupErrors: Array<Object>,
  currentStep: number,
  handleSubmit: Function,
  onPrevious: Function
};

const fields = ['birthdate', 'name', 'nationality_id', 'email', 'mobile', 'gender', 'password', 'contact_email']

const SecondStep = (props: PropsType): React.Element<'form'> => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className='Library-Signup__inputs p-a-3 text-xs-center p-t-3'>
        <label className='font-weight-bold'>أدخل كلمة المرور لإنشاء حسابك</label>
        <div className='row'>
          <div className='col-xs-12 col-md-6 col-md-pull-3'>
            <MaterialInput className='m-t-3' label='البريد الالكتروني' data={props.fields.email} />
            <MaterialInput className='m-t-3' label='كلمة السر' data={props.fields.password}
              type='password'
              checkmark={false} />
          </div>
        </div>
      </div>
      <div className='Library-Signup__footer text-xs-center p-y-3 m-b-3'>
        <button onClick={props.onPrevious}
          type='button'
          className={`btn Library-Signup__footer-back ${props.currentStep < 2 ? 'hidden-xs-up' : ''}`}>
          الرجوع للسابق
        </button>
        <button className='btn btn-success p-x-3 btn-lg'>
          {props.currentStep === 1 ? 'التالي' : 'تسجيل'}
        </button>
        {props.signupErrors.length ? <div className='container m-t-3'>
          <div className='row'>
            <div className='col-xs-12 col-md-6 col-md-pull-3'>
              <div className='alert alert-danger'>
                <ul>
                  {props.signupErrors.map((e: Object, i: number): React.Element<'li'> => <li key={i}>{e.email}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div> : null }
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'librarysignup',
  fields: fields,
  validate: validation,
  destroyOnUnmount: false
})(SecondStep)
