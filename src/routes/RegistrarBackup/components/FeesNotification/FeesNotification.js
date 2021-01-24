import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import Icon from 'components/Icon'
//  import css
import './style.scss'

class RegistrationFees extends Component {
  constructor (props) {
    super(props)
    this._getFees = this._getFees.bind(this)
  }
  render () {
    const { loadingfees, fees_amount: feesAmount, isMobile, enabled } = this.props
    if (!enabled) {
      return false
    }
    let actionText = 'إدفع الكترونيا'
    if (isMobile) {
      actionText = 'دفع رسوم التسجيل 10 ريال'
    }
    return (<div className='c-registrar-fees-notification clearfix' >
      <div className={`c-registrar-fees-notification__drop hidden-xs-up`} />
      <div className='c-registrar-fees-notification__container shadow-2 '>
        <div className='container'>
          <div className={`row ${feesAmount <= 0 && 'hidden-xs-up'} p-t-2`}>
            <div className='col-xs-3 col-md-1 col-md-pull-4'>
              <Icon name='checkmark-success-leaf-medium' className='c-registrar-fees-notification__check' />
            </div>
            <div className='col-xs-7 col-md-4 col-md-pull-4'>
              <h6 className='font-weight-bold'>تم دفع الرسوم بنجاح</h6>
              <p>ستتمكن الآن من إتمام باقي الخطوات</p>
            </div>
          </div>
          <div className={`row ${feesAmount > 0 && 'hidden-xs-up'}`}>
            <div className={`${isMobile && 'hidden-xs-up'} col-xs-12 col-md-6 col-md-pull-2 p-t-1`}>
              <h6 className='font-weight-bold'>رسوم التسجيل
                <span className='text-success font-weight-bold'> 10 ريال</span>
              </h6>
              <p>
                مقابل إعداد وفحص ملفك تمهيدا لعرضه على لجنة القبول، يمكنك السداد حاليا أو عند التحقق من اكتمال الوثائق
              </p>
            </div>
            <div className='col-xs-12 col-md-4 col-md-pull-2'>
              <button disabled={loadingfees} onClick={this._getFees}
                className='btn btn-md m-y-2 p-x-3 btn-success c-registrar-fees-notification__action'>
                {loadingfees ? <Loading scale={20} width={25} height={25} stroke={2} />
                : actionText}
              </button>
              <p className={`${!isMobile && 'hidden-xs-up'}`}>
                مقابل إعداد وفحص ملفك تمهيدا لعرضه على لجنة القبول، يمكنك السداد حاليا أو عند التحقق من اكتمال الوثائق
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
  _getFees () {
    const { getRegistrationFees } = this.props
    getRegistrationFees()
  }
}

RegistrationFees.propTypes = {
  enabled: PropTypes.bool,
  fees_amount: PropTypes.number,
  isMobile: PropTypes.bool,
  loadingfees: PropTypes.bool,
  getRegistrationFees: PropTypes.func
}

export default RegistrationFees
