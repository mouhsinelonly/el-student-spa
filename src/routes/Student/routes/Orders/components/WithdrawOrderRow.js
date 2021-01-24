import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Icon from 'components/Icon'
import './style.scss'

class WithdrawOrderRow extends Component {
  static propTypes = {
    reason: PropTypes.string,
    state: PropTypes.string,
    created_at: PropTypes.string
  }
  render () {
    const { reason, created_at, state } = this.props

    let buttonColor = ''

    const createdAt = moment(created_at)

    switch (state) {
      case 'جاري المراجعة' :
        buttonColor = 'is-info'
        break
      case 'مكتمل' :
        buttonColor = 'is-success'
        break
      case 'قبول' :
        buttonColor = 'is-success'
        break
      case 'غير مكتمل' :
        buttonColor = 'is-warning'
        break
      case 'رفض' :
        buttonColor = 'is-danger'
        break
      case 'الغاء لعدم الاستكما' :
        buttonColor = 'is-danger'
        break
    }

    return (<li className='p-student-orders__orders__item m-b-2 shadow-1 p-y-2' >
      <div className='col-xs-12 col-md-9'>
        <div>طلب انسحاب بسبب {reason}</div>
        <span className='p-student-orders__orders__item-date'>
        بتاريخ {`${createdAt.locale('en').format('D')} ${createdAt.locale('ar-SA').format('MMM')}
        ${createdAt.locale('en').format('YYYY')}`}
        </span>
      </div>
      <div className='col-xs-12 col-md-3'>
        <button className={`btn p-student-orders__orders__item-button ${buttonColor} btn-block`}>
          {(() => {
            switch (state) {
              case 'قبول':
                return <Icon name='check-single-green' className='p-student-orders__orders__item-icon' />
              case 'رفض':
                return <Icon name='times-single-warning' className='p-student-orders__orders__item-icon' />
            }
          })()}
          {state}
        </button>
      </div>
      <div className='clearfix' />
    </li>)
  }
}
export default WithdrawOrderRow
