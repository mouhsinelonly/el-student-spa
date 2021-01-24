import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'

class RegistrationPeriodCountDown extends Component {
  render () {
    const {days, refused} = this.props
    let text = <div>باقي على إنتهاء المدة <span className='p-x-1 text-warning c-registration-countdown__remaining-time'>
  {days}</span> أيام</div>

    if (days <= 3 && days >= 0) {
      text = <div>إنتبه لم يتبق الكثير فقط<span className='p-x-1 text-warning c-registration-countdown__remaining-time'>
      {days}</span> أيام</div>
    } else if (days < 0 && refused) {
      text = <div className='p-x-1 p-y-1'>
        للاسف انتهى الوقت
      </div>
    } else {
      text = <div className='p-x-1 p-y-1'>
        بإمكانك استكمال عملية التسجيل
      </div>
    }
    return (<button
      className={`c-registration-countdown__container
      ${days > 3 ? 'btn-secondary-outline' : 'has-warning'} nav-link btn `}>
      {text}
    </button>)
  }
}
RegistrationPeriodCountDown.propTypes = {
  days: PropTypes.number,
  refused: PropTypes.bool
}
RegistrationPeriodCountDown.defaultProps = {
  days: 0
}

export default RegistrationPeriodCountDown
