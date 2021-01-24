// @flow
import * as React from 'react'
import TestRecordingStep from './components/TestRecordingStep'
import AcceptTermsStep from './components/AcceptTermsStep'
import RecordStep from './components/RecordStep'
import { browserHistory } from 'react-router'

type PropsType = {
  hideStudentNavbar: Function,
  showStudentNavbar: Function,
  changeStep: Function,
  resetQuranRecording: Function,
  isrecorded: boolean,
  isrecording: boolean,
  uploading: boolean,
  uploaded: boolean,
  uploadPercentage: number,
  pages: Array<Object>,
  params: Object,
  profile: Object,
  randompagenumber: number,
  setRandomPageNumber: Function,
  setQuranRecorded: Function,
  recordingStarted: Function,
  recordingStoped: Function,
  storeQuranRecording: Function,
  postAcceptRecording: Function,
  step: string,
  subjects: Array<Object>,
  extendings: Array<Object>,
  recordings: Object
};
class Home extends React.Component<PropsType> {
  componentDidMount () {
    const { hideStudentNavbar, changeStep, resetQuranRecording } = this.props
    resetQuranRecording()
    this._checkEnabled()
    hideStudentNavbar()
    changeStep('test')
  }
  componentWillUnmount () {
    const { showStudentNavbar, resetQuranRecording } = this.props
    showStudentNavbar()
    resetQuranRecording()
  }
  render (): React.Element<*> {
    const { step, params: { subjectId }, subjects } = this.props
    const subject = subjects.find((s: Object): boolean => +s.id === +subjectId)
   
    switch (step) {
      case 'test':
        return <TestRecordingStep {...this.props} />
      case 'terms':
        return <AcceptTermsStep {...this.props} />
      case 'record':
        return <RecordStep {...this.props} start={subject.quranPageStart} end={subject.quranPageEnd} />
      default:
        return <TestRecordingStep {...this.props} />
    }
  }

  _checkEnabled = () => {
    const { params: { subjectId }, subjects, recordings, extendings } = this.props

    let extend = extendings.filter((e: Object): boolean => e.subject_id === parseInt(subjectId, 10))
    extend = extend[extend.length - 1]

    const hasSubject = subjects.findIndex((s: Object): boolean => s.id === parseInt(subjectId, 10)) >= 0
    const recordingIndex = Object.keys(recordings).find((i: Object): boolean =>
      recordings[i].subject_id === parseInt(subjectId, 10))
    const recording = recordings[recordingIndex]

    if (!hasSubject || ((recording && !extend && recording.remaining <= 0) &&
      (extend && extend.maximum_recordings <= 0))) {
      browserHistory.push('/student/exams')
    }
  }
}

export default Home
