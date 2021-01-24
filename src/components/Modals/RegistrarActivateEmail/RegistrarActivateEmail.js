import React, {Component} from 'react'
import './style.scss'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'
class RegistrarActivateEmail extends Component {
  static propTypes = {
    updateRegistrar: PropTypes.func,
    logoutAndRedirect: PropTypes.func,
    sendEmailVerificationLink: PropTypes.func,
    toggleEditableEmail: PropTypes.func,
    email: PropTypes.string,
    sending: PropTypes.bool,
    errors: PropTypes.object,
    showeditableemail: PropTypes.bool,
    updating: PropTypes.bool,
    updated: PropTypes.bool,
    sent: PropTypes.bool
  }
  constructor (props) {
    super(props)

    this._sendVerificationLink = this._sendVerificationLink.bind(this)
    this._toggleEditableEmail = this._toggleEditableEmail.bind(this)
    this._updateEmail = this._updateEmail.bind(this)
  }
  render () {
    const { sending, sent, email, updating, updated, showeditableemail, errors, logoutAndRedirect } = this.props
    const haserrors = Object.getOwnPropertyNames(errors).length !== 0
    return (<div className='shadow-modal'>
      <div className='modal-header'>
        <h4 className='modal-title text-xs-center p-y-2'>قم بتفعيل بريدك</h4>
      </div>
      <div className='modal-body p-a-2'>
        <p>لتتمكن من الدخول لحسابك لمتابعة طلبك يتوجب عليك تفعيل بريدك الإلكتروني. وذلك
             من خلال الضغط على الرابط الموجود في رسالة التفعيل المرسلة لك على بريدك الإلكتروني
        </p>
      </div>
      <footer className={`modal-footer c-registrar-activate-email__footer`}>
        <div className='col-xs-6'>
          {(() => {
            if (sending) {
              return <div><p>جاري إرسال كود التفعيل...</p> <Loading /></div>
            } else if (sent) {
              return <p>تم ارسال رسالة التفعيل الى بريدك الإلكتروني يمكنك أن ترسلها من جديد
              <a onClick={this._sendVerificationLink}>بالضغط هنا</a>.</p>
            } else {
              return (<p>إذا لم تصلك رسالة التفعيل على بريدك الإلكتروني قم
                <a onClick={this._sendVerificationLink}>بالضغط هنا</a> لإرسالها من جديد</p>)
            }
          })()}
        </div>
        <div className='col-xs-6'>
          {(!showeditableemail) && !haserrors && (() => {
            if (updating) {
              return <Loading />
            } else if (updated) {
              return (<p>تم تغيير بريدك بنجاح إلى {email} إذا كان غيرصحيح
                <a onClick={this._toggleEditableEmail}>إضغط هنا لتغييره</a></p>)
            } else {
              return (<p>إذا كان البريد {email} غير صحيح
                <a onClick={this._toggleEditableEmail}>إضغط هنا</a>لتغييره</p>)
            }
          })()}
          {
            showeditableemail && updating && <Loading />
          }
        {
          (showeditableemail || haserrors) && !updating && <div className='form-group m-t-1'>
            <div className='input-group'>
              <input defaultValue={email} ref='email' type='email'
                className='form-control form-control-md'
                placeholder='البريد الصحيح' />
              <span className='input-group-btn'>
                <button onClick={this._updateEmail} className='btn btn-success btn-md'>
                أرسل
                </button>
              </span>
            </div>
          </div>
        }
        { haserrors && showeditableemail && <div>{Object.keys(errors).map((k) => {
          return errors[k].map((v, i) => {
            return <small className='text-danger' key={i}>{v}</small>
          })
        })}</div>}
        </div>
        <a onClick={logoutAndRedirect} className='text-left pull-xs-left text-danger'>الخروج و التفعيل لاحقا</a>
      </footer>
    </div>
    )
  }

  _updateEmail (e) {
    const { updateRegistrar } = this.props
    updateRegistrar({ contact_email: this.refs['email'].value })
    // toggleEditableEmail()
  }

  _toggleEditableEmail () {
    const { toggleEditableEmail } = this.props
    toggleEditableEmail()
  }
  _sendVerificationLink () {
    const { sendEmailVerificationLink } = this.props
    sendEmailVerificationLink()
  }
}

export default RegistrarActivateEmail
