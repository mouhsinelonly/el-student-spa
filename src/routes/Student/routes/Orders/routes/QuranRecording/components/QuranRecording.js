import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import RulesList from 'components/RulesList'
import ReasonForm from '../../../components/ReasonForm'
import UploadForm from './UploadForm'
import ChooseSubject from './ChooseSubject'
import Loading from 'components/Loading'

import './style.scss'

class QuranRecording extends Component {
  static propTypes = {
    active: PropTypes.number,
    subjects: PropTypes.array,
    events: PropTypes.array,
    submitting: PropTypes.bool,
    uploadFile: PropTypes.func,
    sendQuranRecordingOrder: PropTypes.func,
    setQuranRecordingActivePage: PropTypes.func
  }
  constructor (props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._goNext = this._goNext.bind(this)
    this._goPrev = this._goPrev.bind(this)
  }
  render () {
    const {active, events, uploadFile, submitting, subjects} = this.props

    if (!events.length || submitting) {
      return <Loading />
    }

    const event = events.find(e => e.category === 'quran_recording_excuses')

    return (<div className='container p-y-3'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
          <h1 className='c-student-quran-recording-order__title text-xs-center m-b-3'>
            {active === 1
              ? <Link to='/student/orders' className='c-student-quran-recording-order__goback'>الرجوع للسابق</Link>
              : <a onClick={this._goPrev} className='c-student-quran-recording-order__goback'>الرجوع للسابق</a>
            }
            تقديم عذر للتلاوة
            <span className='c-student-quran-recording-order__subtitle p-t-2'>
            {
              (() => {
                switch (active) {
                  case 1:
                    return 'الموافقة على الشروط'
                  case 2:
                    return 'إختر المادة'
                  case 3:
                    return 'إختر سبب العذر'
                  case 4:
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
                    title='قوانين و شروط أعذار القران الكريم'
                    actionText='موافق٫ استمر'
                    rules={event.instructions} />
                case 2:
                  return <ChooseSubject
                    subjects={subjects.filter(s => s.is_quran === 1)}
                    onSubmit={this._goNext}
                    onPrevious={this._goPrev} />
                case 3:
                  return <ReasonForm reasons={event.reasons}
                    onSubmit={this._goNext}
                    form='quranrecordingform'
                    onPrevious={this._goPrev} />
                case 4:
                  return <UploadForm
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
    const { sendQuranRecordingOrder } = this.props
    sendQuranRecordingOrder(values)
  }
  _goNext () {
    const { active, setQuranRecordingActivePage } = this.props
    setQuranRecordingActivePage(active + 1)
  }
  _goPrev () {
    const { active, setQuranRecordingActivePage } = this.props
    setQuranRecordingActivePage(active - 1)
  }
}

export default QuranRecording
