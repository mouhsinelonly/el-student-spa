import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UploadForm from './UploadForm'
import Loading from 'components/Loading'
import ChooseReason from './ChooseReason'
import './style.scss'

const CHOOSE_REASON_STEP = 1
const UPLOAD_FILE_STEP = 2

class SessionExcuse extends Component {
  static propTypes = {
    reason: PropTypes.string,
    submitting: PropTypes.bool,
    sessions: PropTypes.array,
    reasons: PropTypes.array,
    getExcuseReasons: PropTypes.func,
    step: PropTypes.number,
    orders: PropTypes.array,
    sendSessionExcusesOrder: PropTypes.func,
    params: PropTypes.object.isRequired,
    uploadFile: PropTypes.func,
    setExcuseReason: PropTypes.func,
    changeStep: PropTypes.func
  }
  componentDidMount () {
    const { getExcuseReasons } = this.props
    getExcuseReasons()
  }
  render () {
    const { orders, uploadFile, sessions, params: { id }, submitting, step,
      changeStep, setExcuseReason, reason, reasons } = this.props

    if (sessions.length === 0 || submitting) {
      return <div className='p-y-3'><Loading /></div>
    }

    if (orders.findIndex(o => o.session_id === parseInt(id, 10)) >= 0) {
      return <div className='text-xs-center p-y-3'>
        تم ارسال عذرك
      </div>
    }
    const session = sessions.find(s => s.classroom_session_id === parseInt(id, 10))

    if (!session || session.attended !== 0) {
      return false
    }

    return (<div className='container p-y-3'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-10 col-lg-pull-1'>
          <h1 className='c-student-session-excuse-order__title text-xs-center m-b-3'>
            تقديم عذر غياب
            <span className='c-student-session-excuse-order__subtitle p-t-2'>
              {session.classroom_session.title} {session.classroom_session.subject.name}
            </span>
          </h1>
          {(() => {
            switch (step) {
              case CHOOSE_REASON_STEP:
                return <ChooseReason
                  activeReason={reason}
                  onNext={changeStep}
                  reasons={reasons}
                  onChoice={setExcuseReason} />
              case UPLOAD_FILE_STEP:
                return <UploadForm
                  onNext={changeStep}
                  uploadFile={uploadFile}
                  initialValues={{ session_id: parseInt(id, 10) }}
                  onSubmit={this._handleSubmit} />
              default :
                return <ChooseReason onNext={changeStep} onChoice={setExcuseReason} />
            }
          })()}

        </div>
      </div>
    </div>)
  }
  _handleSubmit = (values) => {
    const { sendSessionExcusesOrder } = this.props
    sendSessionExcusesOrder(values)
  }
}

export default SessionExcuse
