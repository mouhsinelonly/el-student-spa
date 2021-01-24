// @flow
import * as React from 'react'
import './style.scss'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validation from './validation'
const fields = ['mobile', 'password']

type PropsType = {
  loading: boolean,
  formVisible: boolean,
  handleSubmit: Function,
  updateStudent: Function,
  id: number,
  invalid: boolean,
  student: Object,
  fields: Object,
  toggleEditStudentProfile: Function
};
class EditProfileForm extends React.Component<PropsType> {
  render (): React.Element<'form'> {
    const { formVisible, fields: { mobile, password }, invalid, handleSubmit, loading } = this.props

    return (
      <form onSubmit={handleSubmit(this._update)}
        autoComplete='off'
        className={`user2-dashboard-side-editform p-a-1 ${!formVisible ? 'is-hidden' : ''}`}>
        <span className='material-icons' onClick={this._hide}>arrow_forward</span>
        <h6 className='text-xs-center user2-dashboard-side-editform__title'>
          تعديل البيانات
        </h6>
        <div className={`form-group m-t-3 ${mobile.dirty && mobile.error ? 'has-danger' : ''}`}>
          <label htmlFor='inputMobile'>رقم الهاتف</label>
          <input type='number' {...domOnlyProps(mobile)}
            className={`form-control ${mobile.dirty && mobile.error ? 'form-control-danger' : ''}`}
            id='inputMobile' autoComplete='off' placeholder='مثال : 90164489' />
        </div>
        <div className={`form-group ${password.dirty && password.error ? 'has-danger' : ''}`}>
          <label htmlFor='inputPassword'>تعديل كلمة المرور</label>
          <input type='password' {...domOnlyProps(password)}
            className={`form-control ${password.dirty && password.error ? 'form-control-danger' : ''}`}
            id='inputPassword' autoComplete='off' placeholder='' />
        </div>
        <button disabled={invalid || loading}
          className='btn btn-primary btn-lg m-t-2 user2-dashboard-side-editform__save-btn p-x-3'>
          حفظ التعديل
        </button>
      </form>
    )
  }
  _hide = () => {
    const { toggleEditStudentProfile } = this.props
    toggleEditStudentProfile()
  }
  _update = (values: Object) => {
    const { id, updateStudent } = this.props
    updateStudent(id, values)
  }
}

export default reduxForm({
  form: 'editstudentprofileform',
  fields,
  validate: validation,
  destroyOnUnmount: true
})(EditProfileForm)
