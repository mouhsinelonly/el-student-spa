// @flow
import React from 'react'
import './LoginTabContent.scss'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validation from './validation'

type PropsType = {
  fields: Object,
  handleSubmit: Function
};

const fields = [
  'email',
  'password',
  'mobile'
]

const LoginTabContent = (props: PropsType): React.Element<'div'> => {
  const { fields: { mobile, email, password }, handleSubmit } = props
  return (<form
    onSubmit={handleSubmit}
    className='Affiliate-LoginTabContent text-xs-center'>
    <input type='text'
      {...domOnlyProps(email)}
      disabled
      redonly='true'
      placeholder='البريد الالكتروني'
      className='disabled readonly Affiliate-LoginTabContent__form-control m-t-1' />
    <input type='password'
      placeholder='كلمة المرور'
      {...domOnlyProps(password)}
      className='Affiliate-LoginTabContent__form-control m-t-1' />
    <input type='text'
      {...domOnlyProps(mobile)}
      placeholder='رقم الهاتف'
      className='Affiliate-LoginTabContent__form-control m-t-1' />
    <button className='btn btn-success m-t-2 Affiliate-LoginTabContent__cta p-x-2'>
      حفظ التعديلات
    </button>
  </form>)
}
export default reduxForm({
  form: 'affiliate-settings-form-login',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: true,     // <------ preserve form data,
  validate: validation
})(LoginTabContent)
