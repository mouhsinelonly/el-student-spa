import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'
import validation from './validation'
import Input from 'components/Form/MaterialInput'
import gmail from 'static/img/icons/gmail-small.png'
import appStore from 'static/img/icons/appstore-small.png'
import playStore from 'static/img/icons/playstore-small.png'

export const fields = [
  'password'
]
class Profile extends Component {
  static propTypes = {
    updateProfile: PropTypes.func,
    handleSubmit: PropTypes.func,
    fields: PropTypes.object
  }
  constructor (props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    const { fields: { password }, profile: { code, photo: { original: photo }, name, nationality_iso: nationalityIso,
      nationality_country: country, contact_iso: contactIso,
      contact_country: contactCountry, email, state }, invalid, handleSubmit } = this.props
      // console.log(photo)
    return (<form onSubmit={handleSubmit(this._handleSubmit)} className='p-y-3 p-student-profile__container'>
      <h1 className='text-xs-center m-b-2'>
        <b>إعدادات الحساب</b>
      </h1>
      <h5 className='text-xs-center m-b-3'>{name} {code}</h5>
      <div className='clearfix' />
      <div className=' m-t-3'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
          <div className='p-student-profile__right-col col-xs-12 col-md-6 p-x-3'>
            {/* <Input {...domOnlyProps(email)} label='بريدك الإلكتروني'
              className='m-b-2' /> */}
            <Input data={password} autocomplete='new-password' type='password' label='كلمة المرور' />
            <button
              disabled={invalid}
              style={{ display: 'block', width: 190 }}
              className='btn btn-lg btn-success p-x-3 m-t-2 m-x-auto'>
            حفظ
            </button>
          </div>
          <div className='col-xs-12 col-md-6 text-xs-center'>
            {/* nationalityIso && <div className='col-xs-12 col-md-6 hidden-xs-up'>
              <h5>الجنسية</h5>
              <p><img className='m-l-1'
                src={`http://el-css.edu.om/admin/public/assets/flags/${nationalityIso.toLowerCase()}.png`} />
                {country}</p>
            </div> */}
            {/* contactIso && <div className='col-xs-12 col-md-6 hidden-xs-up'>
              <h5>دولة الاقامة</h5>
              <p><img className='m-l-1'
                src={`http://el-css.edu.om/admin/public/assets/flags/${contactIso.toLowerCase()}.png`} />
                {contactCountry}</p>
            </div> */}

            <h5>بريدك الخاص بالكلية</h5>
            <address className='p-student-profile__email-text m-y-2'>{email}</address>
            <p>كلمة المرور نفسها الخاصة بحسابك بالنظام</p>
            <a href='https://mail.google.com/a/el-css.edu.om' target='_blank' className='m-t-2 p-x-3 btn btn-success'>
              رابط بريد الكلية
            </a>
          </div>
          <div className='clearfix m-y-2' />
          <div className='p-student-profile__apps-block p-t-3'>
            <div className='col-xs-12 col-md-8 p-r-2'>
              <img src={gmail} alt='gmail' className='p-student-profile__apps-block__gmail-icon m-l-2' />
              <p className='p-r-3'>
                لضمان وصول آخر أخبار و تحديثات الدراسة ننصحك بتحميل تطبيق Gmail و الدخول من خلاله لحسابك
              </p>
            </div>
            <div className='col-xs-12 col-md-4'>
              <a target='_blank'
                href='https://itunes.apple.com/us/app/gmail-email-from-google/id422689480?mt=8'>
                <img src={appStore}
                  alt='gmail'
                  className='m-l-2' />
              </a>
              <a href='https://play.google.com/store/apps/details?id=com.google.android.gm&hl=en'
                target='_blank'>
                <img src={playStore}
                  alt='gmail' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>)
  }
  _handleSubmit (values) {
    const { updateProfile } = this.props
    updateProfile(values)
  }
}

export default reduxForm({
  form: 'profileForm',
  fields,
  validate: validation
})(Profile)
