import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import { Link } from 'react-router'
import moment from 'moment'
import FeesNotification from './FeesNotification'
import requireAuthentication from 'components/AuthenticatedComponent'
// components
import Navbar from 'components/Navbar'
import RegistrationRefused from './RegistrationRefused'
import DefaultDashboard from './DefaultDashboard'
// import RegistrationPeriodCountDown from './RegistrationPeriodCountDown'
import EmailVerification from './EmailVerification'
// import css
import './Registrar.scss'
// import assets
import logo from 'static/img/logo.png'
import teaserImg from 'static/img/system_teaser.jpg'
class Registrar extends Component {
  static propTypes = {
    profile: PropTypes.object,
    loading: PropTypes.bool
  }
  static defaultProps = {
    profile: {},
    loading: false
  }

  constructor (props) {
    super(props)

    this.logoutAndRedirect = this.logoutAndRedirect.bind(this)
    this.openProfileEdit = this.openProfileEdit.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  componentDidMount () {
    const { getProfile } = this.props
    getProfile()
  }

  logoutAndRedirect () {
    const { logoutAndRedirect } = this.props
    logoutAndRedirect()
  }

  openProfileEdit () {
    const { showModal } = this.props
    showModal('profile_edit')
  }

  closeModal (name) {
    const { closeModal } = this.props
    closeModal(name)
  }

  render () {
    const { profile, profile: { files, histories, step, email_verified: emailVerified,
      period, registration_step_id: stepId, fees_amount: feesAmount }, loading,
    modalvisible, modalname, showModal } = this.props

    if (loading) {
      return <div className='registrar-page__loading-container'>
        <Loading className='registrar-page__loading' />
      </div>
    }

    const refused = stepId === 3 || stepId === 15

    const feesNotificationEnabled = (histories.findIndex(h => h.step.files_done === 1) < 0 ||
      (stepId === 10 && feesAmount > 0)) && !refused

    const days = moment(period && period.finish_at).diff(moment(), 'days')
    let data
    if ((modalvisible && modalname === 'payment') || profile.transaction_uuid) {
      data = (<img className='img-fluid' src={teaserImg} />)
    } else {
      data = (<div className='registrar-page__container'>
        {!emailVerified ? <EmailVerification verified={emailVerified} /> : null}
        <Navbar>
          <ul className='nav pull-xs-right p-r-0'>
            <li>
              <Link to='/registrar'>
                <img src={logo} className='registrar-page__logo' />
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-nav pull-sm-left registrar-page__navbar'>
            {/* <li className='nav-item active'>
              <RegistrationPeriodCountDown refused={refused} days={days} />
            </li> */}
            <li className='nav-item registrar-page__navbar__item active'>
              <a className='registrar-page__edit-profile nav-link p-x-2 p-t-1' onClick={this.openProfileEdit}>
                <u>تعديل البريد أو الهاتف</u>
              </a>
            </li>
            <li className='nav-item registrar-page__navbar__item'>
              <button onClick={this.logoutAndRedirect}
                className='registrar-page__logout-button btn p-x-3 btn-dark-gray btn-lg'>
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </Navbar>
        {this.props.children || (!refused ? <DefaultDashboard
          showModal={showModal}
          histories={histories}
          files={files}
          days={days}
          step={step}
          profile={profile} /> : <RegistrationRefused />)}
      </div>)
    }

    return (
      <div>
        {data}
        <FeesNotification enabled={feesNotificationEnabled} />
      </div>
    )
  }
}

Registrar.propTypes = {
  children: PropTypes.element,
  getProfile: PropTypes.func.isRequired,
  logoutAndRedirect: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalvisible: PropTypes.bool.isRequired,
  modalname: PropTypes.string.isRequired
}

export default requireAuthentication(Registrar)
