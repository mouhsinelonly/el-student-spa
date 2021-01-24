// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import { Link } from 'react-router'
import moment from 'moment'
import FeesNotification from './FeesNotification'
import requireAuthentication from 'components/AuthenticatedComponent'
// components
import Navbar from 'components/Navbar'
import RegistrationRefused from './RegistrationRefused'
import DefaultDashboard from './DefaultDashboard'
import MajesteerDashboard from './MajesteerDashboard'
// import RegistrationPeriodCountDown from './RegistrationPeriodCountDown'
import EmailVerification from './EmailVerification'
// import css
import './Registrar.scss'
// import assets
import logo from 'static/img/logo.png'
import teaserImg from 'static/img/system_teaser.jpg'

type PropsType = {
  profile: Object,
  loading: boolean,
  getProfile: Function,
  getExams: Function,
  logoutAndRedirect: Function,
  showModal: Function,
  closeModal: Function,
  modalvisible: boolean,
  modalname: boolean,
  getExamRules: Function
};

class Registrar extends React.Component<PropsType> {
  static defaultProps = {
    profile: {},
    loading: false
  }
  componentDidMount () {
    const { getProfile, getExams, getExamRules } = this.props
    getProfile()
    getExamRules()
    getExams()
  }

  logoutAndRedirect = () => {
    const { logoutAndRedirect } = this.props
    logoutAndRedirect()
  }

  openProfileEdit = () => {
    const { showModal } = this.props
    showModal('profile_edit')
  }

  closeModal = (name: string) => {
    const { closeModal } = this.props
    closeModal(name)
  }

  render (): React.Element<'*'> {
    const { profile, profile: { files, histories, step, email_verified: emailVerified,
      period, registration_step_id: stepId, fees_amount: feesAmount,
      academystructure_specialty_id: specialtyId }, loading,
    modalvisible, modalname, showModal } = this.props

    if (loading) {
      return <div className='registrar-page__loading-container'>
        <Loading className='registrar-page__loading' />
      </div>
    }

    const refused = step.is_canceled === 1

    const feesNotificationEnabled = (histories.findIndex((h: Object): boolean => h.step.files_done === 1) < 0 ||
      (stepId === 10 && feesAmount > 0)) && !refused

    const degreeType = [1, 2, 3, 9 , 10, 11].includes(+specialtyId) ? 'bac' : 'maj'
    const days = moment(period && period.finish_at).diff(moment(), 'days')

    const dashboard = degreeType === 'bac' ? <DefaultDashboard
      showModal={showModal}
      histories={histories}
      files={files}
      days={days}
      step={step}
      profile={profile} /> : <MajesteerDashboard
        showModal={showModal}
        histories={histories}
        files={files}
        days={days}
        step={step}
        profile={profile} />

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
        {this.props.children || (!refused ? dashboard : <RegistrationRefused />)}
      </div>)
    }

    return (
      <>
        {data}
        <FeesNotification enabled={feesNotificationEnabled} />
      </>
    )
  }
}

export default requireAuthentication(Registrar)
