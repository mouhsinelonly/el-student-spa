import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import RulesList from 'components/RulesList'
import ReasonForm from '../../../components/ReasonForm'
import UploadForm from 'routes/Student/routes/Orders/components/UploadForm'
import Loading from 'components/Loading'

import './style.scss'

function getActiveEvent (event, types): boolean {
  return types.includes(event.category) && (event.isCurrent || event.isFuture)
}

class Delay extends Component {
  static propTypes = {
    active: PropTypes.number,
    events: PropTypes.array,
    submitting: PropTypes.bool,
    uploadFile: PropTypes.func,
    sendDelayOrder: PropTypes.func,
    setDelayActivePage: PropTypes.func
  }
  constructor (props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._goNext = this._goNext.bind(this)
    this._goPrev = this._goPrev.bind(this)
  }
  render () {
    const { active, events, uploadFile, submitting } = this.props

    if (!events.length || submitting) {
      return <Loading />
    }

    const event = events.find(event => getActiveEvent(event, ['full_delay', 'zero_delay', 'half_delay']))
    return (<div className='container p-y-3'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
          <h1 className='p-orders-delay__title text-xs-center m-b-3'>
            {active === 1
              ? <Link to='/student/orders' className='p-orders-delay__goback'>الرجوع للسابق</Link>
              : <a onClick={this._goPrev} className='p-orders-delay__goback'>الرجوع للسابق</a>
            }
            طلب تأجيل الدراسة
            <span className='p-orders-delay__subtitle p-t-2'>
              {
              (() => {
                switch (active) {
                  case 1:
                    return 'الموافقة على الشروط'
                  case 2:
                    return 'إختر سبب التأجيل'
                  case 3:
                    return 'رفع وثيقة الإثبات'
                }
              })()
            }
            </span>
          </h1>
          {
            (() => {
              switch (active) {
                case 1:
                  return <RulesList onSubmit={this._goNext}
                    title='قوانين و شروط التأجيل'
                    actionText='موافق٫ استمر'
                    rules={event.instructions} />
                case 2:
                  return <ReasonForm reasons={event.reasons}
                    form='delayform'
                    onSubmit={this._goNext}
                    onPrevious={this._goPrev} />
                case 3:
                  return <UploadForm
                    form='delayform'
                    uploadFile={uploadFile}
                    onSubmit={this._handleSubmit} />
              }
            })()
          }
        </div>
      </div>
    </div>)
  }
  _handleSubmit (values) {
    const { sendDelayOrder } = this.props
    sendDelayOrder(values)
  }
  _goNext () {
    const { active, setDelayActivePage } = this.props
    setDelayActivePage(active + 1)
  }
  _goPrev () {
    const { active, setDelayActivePage } = this.props
    setDelayActivePage(active - 1)
  }
}

export default Delay
