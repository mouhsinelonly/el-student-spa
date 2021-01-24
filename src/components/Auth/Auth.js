import React from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import jwtDecode from 'jwt-decode'
import './Auth.scss'
import { browserHistory, Link } from 'react-router'
import Icon from 'components/Icon'

class Auth extends React.Component {
  usertoken = undefined
  static defaultProps = {
    passwordischanging: false,
    currentform: 'login',
    resetpasswordstatus: 0
  }
  static propTypes = {
    isAuthenticating: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isUserAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    usertoken: PropTypes.string,
    statusText: PropTypes.string,
    toggleAuthForm: PropTypes.func,
    getToken: PropTypes.func,
    resetPassword: PropTypes.func,
    currentform: PropTypes.string,
    passwordischanging: PropTypes.bool,
    resetpasswordstatus: PropTypes.number,
    loginUser: PropTypes.func
  }
  state = {
    showPassword: false,
    username: '',
    nationalid: '',
    password: '',
    redirectTo: '/auth'
  }

  componentDidMount () {
    const { isAuthenticated, isUserAuthenticated, token, usertoken, getToken } = this.props
    const { token: QueryToken } = browserHistory.getCurrentLocation().query
    if (QueryToken) {
      getToken({ token: QueryToken })
    }
    if (isUserAuthenticated) {
      this.usertoken = jwtDecode(usertoken)
    }
    if (isAuthenticated && token) {
      const decoded = jwtDecode(token)

      switch (decoded.guard) {
        case 'student':
          browserHistory.push('/student')
          break
        case 'user':
          browserHistory.push('/user')
          break
        case 'affiliate':
          browserHistory.push('/affiliate/home')
          break
        case 'teacher':
         //  document.location.href = 'https://teacher.el-css.edu.om'
          // browserHistory.push('teacher')
          break
        case 'registrar':
          browserHistory.push('/registrar')
          break
        case 'marketuser' :
          browserHistory.push('/eshop/dashboard')
          break
        case 'marketusers' :
          browserHistory.push('/eshop/dashboard')
          break
      }
    }
  }

  render () {
    const {
      statusText,
      isAuthenticating,
      isAuthenticated,
      token,
      isUserAuthenticated,
      passwordischanging,
      currentform,
      resetpasswordstatus
    } = this.props
    const { showPassword } = this.state

    if (isAuthenticated && token) return <div>جاري تحويلك....</div>

    return (
      <div className='auth-page__container'>
        <div className={`auth-page__login-container col-xs-12 col-md-4 col-md-pull-4 m-t-3`}>
          <div className={`auth-page__old-hint ${isUserAuthenticated ? '' : 'hidden-xs-up'}`}>
            <p className='p-a-2'>
              الذهاب لحساب الادارة <Link to='/user'>من هنا</Link>.
            </p>
          </div>
          <form
            role='form'
            className={`auth-page__form ${currentform !== 'reset' ? 'hidden-xs-up' : ''} text-xs-center`}
          >
            <header className={`auth-page__form__header p-a-3`}>
              <h3 className='text-xs-center m-0'>
                <span className={`${resetpasswordstatus === 1 ? 'hidden-xs-up' : ''}`}>إسترجاع كلمة المرور</span>
                <span className={`${resetpasswordstatus !== 1 ? 'hidden-xs-up' : ''}`}>تم الإرسال</span>
              </h3>
            </header>
            <section className={`auth-page__form__body`}>
              <div className={`${resetpasswordstatus !== 1 ? 'hidden-xs-up' : ''}`}>
                <p>تم تغيير كلمة المرور في البوابة و بريد الكلية بنجاح.</p>
                <p>ستصلك كلمة المرور عبر الهاتف و البريد الإلكتروني.</p>
                <button type='button' onClick={this._showLoginForm} className='btn btn-success m-t-1 p-y-1'>
                  <Icon name='arrow-right-small-white' /> العودة لصفحة دخول البوابة
                </button>
              </div>
              {passwordischanging ? (
                <Loading width={60} height={60} />
              ) : (
                <div className={`${resetpasswordstatus === 1 ? 'hidden-xs-up' : ''}`}>
                  <div className='form-group'>
                    <input
                      type='text'
                      autoFocus
                      className='form-control input-lg p-y-1'
                      onChange={this._usernameChanged}
                      placeholder='رقمك الجامعي'
                    />
                  </div>
                  <div className={`auth-page__password-group form-group`}>
                    <input
                      type='text'
                      className='form-control input-lg p-y-1'
                      onChange={this._nationalidChanged}
                      placeholder='رقمك المدني'
                    />
                  </div>
                  <button
                    type='button'
                    className={`btn btn-success btn-lg  btn-block m-t-2 auth-page__cta`}
                    disabled={passwordischanging}
                    onClick={this._resetPassword}
                  >
                    إرسال كلمة المرور الجديدة
                  </button>
                </div>
              )}
            </section>
            {resetpasswordstatus === 2 ? (
              <div className='text text-danger m-t-2 p-b-2'>البيانات التي ادخلتها غير صحيحة</div>
            ) : null}
          </form>
          <form role='form' className={`auth-page__form ${currentform !== 'login' ? 'hidden-xs-up' : ''}`}>
            <header className={`auth-page__form__header`}>
              <h3 className='text-xs-center m-0'>دخول البوابة</h3>
            </header>
            <section className={`auth-page__form__body text-xs-center`}>
              {isAuthenticating ? (
                <Loading width={60} height={60} />
              ) : (
                <div>
                  <div className='form-group'>
                    <input
                      type='text'
                      autoFocus
                      autoComplete='current-username'
                      className='auth-page__input form-control input-lg p-y-1'
                      onChange={this._usernameChanged}
                      placeholder='رقمك الجامعي أو رقم الطلب'
                    />
                  </div>
                  <div className={`auth-page__password-group form-group`}>
                    <input
                      type={showPassword === true ? 'text' : 'password'}
                      className='auth-page__input form-control input-lg p-y-1'
                      onChange={this._passwordChanged}
                      autoComplete='current-password'
                      placeholder='كلمة المرور'
                    />
                    <button onClick={this._showPassword} type='button'>
                      {showPassword ? 'إخفاء' : 'إظهار'}
                    </button>
                  </div>
                  <button
                    className={`btn btn-success btn-lg  m-t-2 auth-page__cta`}
                    disabled={isAuthenticating}
                    onClick={this._login}
                  >
                    تسجيل الدخول
                  </button>
                </div>
              )}
              {statusText ? <div className='text text-success m-t-2'>{statusText}</div> : ''}
            </section>
          </form>
          <ul className={`auth-page__links text-xs-center`}>
            <li className={`auth-page__links__item ${currentform !== 'login' ? 'hidden-xs-up' : ''} hidden-xs-up`}>
              نسيت رقمك الجامعي ؟
            </li>
            <li
              onClick={this._showPasswordForm}
              className={`auth-page__links__item ${currentform !== 'login' ? 'hidden-xs-up' : ''}`}
            >
              نسيت كلمة المرور ؟
            </li>
            <li
              onClick={this._showLoginForm}
              className={`auth-page__links__item
                ${currentform === 'login' || resetpasswordstatus === 1 ? 'hidden-xs-up' : ''}`}
            >
              العودة لصفحة دخول البوابة
            </li>
          </ul>
        </div>
        <div className='clearfix' />
      </div>
    )
  }
  _showPassword = () => {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }
  _login = e => {
    e.preventDefault()
    const { loginUser, location: { query: { guard } } } = this.props
    const { username, password, redirectTo } = this.state
    loginUser({ username, password, redirectTo, guard })
  }

  _usernameChanged = e => {
    this.setState({ username: e.target.value })
  }
  _passwordChanged = e => {
    this.setState({ password: e.target.value })
  }
  _nationalidChanged = e => {
    this.setState({ nationalid: e.target.value })
  }
  _showLoginForm = () => {
    const { toggleAuthForm } = this.props
    toggleAuthForm('login')
  }
  _showPasswordForm = () => {
    const { toggleAuthForm } = this.props
    toggleAuthForm('reset')
  }
  _resetPassword = () => {
    const { resetPassword } = this.props
    const { username, nationalid } = this.state
    resetPassword(username, nationalid)
  }
}

export default Auth
