// @flow
import * as React from 'react'
import { Link } from 'react-router'
import { getRandomInt } from 'utils'
import './style.scss'
import QuranPageSrc from 'static/img/quran-page.jpg'
import HTML5VideoRecorder from 'components/HTML5VideoRecorder'

type PropsType = {
  params: Object,
  randompagenumber: number,
  pages: Array<Object>,
  start: number,
  end: number,
  isrecorded: boolean,
  subjects: Array<Object>,
  extendings: Array<Object>,
  uploadPercentage: number,
  recordings: Array<Object>,
  profile: Object,
  uploading: boolean,
  isrecording: boolean,
  recordingStarted: Function,
  setQuranRecorded: Function,
  resetQuranRecording: Function,
  decreaseRemaining: Function,
  storeQuranRecording: Function,
  setRecorderInstance: Function,
  showModal: Function,
  recordingStoped: Function,
  setRandomPageNumber: Function
};

type StateType = {
  randomInt: number
};
class RecordStep extends React.Component<PropsType, StateType> {
  state = { randomInt: getRandomInt(999999, 11111111) }

  componentDidUpdate (nextProps: Object) {
    const { params: { subjectId }, pages, randompagenumber, setRandomPageNumber, start, end } = this.props

    this._checkEnabled()

    if (!randompagenumber && pages) {
      const subjectPage = pages.find((p: Object): boolean => +p.subject_id === +subjectId)
      if (subjectPage) {
        const randomPage = getRandomInt(+start, +end)
        if (randomPage) {
          setRandomPageNumber(randomPage)
        }
      }
    }
  }

  componentDidMount () {
    const { params: { subjectId }, pages, randompagenumber, setRandomPageNumber, start, end } = this.props

    this._checkEnabled()

    if (!randompagenumber && pages) {
      const subjectPage = pages.find((p: Object): boolean => +p.subject_id === +subjectId)
      if (subjectPage) {
        const randomPage = getRandomInt(+start, +end)
        if (randomPage) {
          setRandomPageNumber(randomPage)
        }
      }
    }
  }
  componentWillUnmount () {
    const { resetQuranRecording } = this.props
    resetQuranRecording()
  }
  render (): React.Element<'div'> {
    const {
      profile: { id: studentId },
      randompagenumber,
      isrecorded,
      isrecording,
      recordings,
      extendings,
      uploadPercentage,
      uploading,
      params: { subjectId }
    } = this.props

    let extend = extendings.filter(e => e.subject_id === parseInt(subjectId, 10))
    extend = extend[extend.length - 1]

    const recordingIndex = Object.keys(recordings).find(
      (k: Object): boolean => parseInt(recordings[k].subject_id, 10) === parseInt(subjectId, 10)
    )
    const recording = recordings && recordingIndex ? recordings[recordingIndex] : {}
    const { valid } = recording
    const maxTries = ((extend && recording && extend.maximum_recordings > recording.remaining) ||
      (!recording.remaining && extend))
    ? extend.maximum_recordings
    : (recording.remaining ? recording.remaining : 3)

    const { randomInt } = this.state
    let ctaText = 'اعتماد التسجيل'

    if (uploading) {
      ctaText = `جاري الرفع - ${parseInt(uploadPercentage, 10)}%`
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='TestRecordingStep__col col-xs-12 col-md-4 is-sticky'>
            <Link to='/student' className='p-quran-pagev2__back is-top text-xs-right'>
              <i className='material-icons m-l-1'>arrow_forward</i> {valid ? 'الرئيسية' : 'الاختبار لاحقا'}
            </Link>
            <HTML5VideoRecorder
              width={320}
              key={randompagenumber}
              videoId={`html5_${studentId}_${subjectId}_${randompagenumber}_${randomInt}`}
              height={240}
              ref={ref => this._setRecorderInstance(ref)}
              minutes={5}
              uploadAfterDone
              enabled={maxTries > 0}
              className='p-quran-pagev2__recorder'
              onRecordingStop={this._handleStopRecordingPressed}
              onUploadDone={this._handleOnUploadDone}
              onRecordingStart={this._handleOnRecordingStarted}
              />
            <button
              disabled={maxTries <= 0}
              onClick={this._showRetry}
              className={`${isrecorded && !valid
                  ? ''
                  : 'hidden-xs-up'} p-quran-pagev2__action btn btn-lg btn-white pull-xs-right m-t-2`}
              >
              محاولة جديدة
            </button>
            <button
              disabled={uploading}
              onClick={this._showAccept}
              style={{
                background: uploading
                    ? `linear-gradient(to left,#00c674 ${uploadPercentage}%, #b9c2cb ${uploadPercentage}%)`
                    : ''
              }}
              className={`${isrecorded && !valid
                  ? ''
                  : 'hidden-xs-up'} p-quran-pagev2__action btn btn-lg btn-success pull-xs-left m-t-2`}
              >
              {ctaText}
            </button>
            <div className='clearfix' />
            <div className={`${valid ? 'hidden-xs-up' : ''} p-y-2`} >
              {maxTries ? `باقي ${maxTries > 0 ? maxTries : 0} محاولة` : 'انتهت المحاولات'}
            </div>
            <div className={`${!valid ? 'hidden-xs-up' : ''} p-y-2`} >
              تم اعتماد التسجيل <br />
              <Link className='btn btn-success m-t-2' to='/student'>الرجوع للصفحة الشخصية</Link>
            </div>
          </div>
          <div className='col-xs-12 col-md-8 TestRecordingStep__col'>
            <div className='TestRecordingStep__rules my-panel-white shadow-1 no-overflow text-xs-center p-quran-pagev2__page-container'>
              <img
                src={
                  !isrecording && !isrecorded
                    ? QuranPageSrc
                    : `//tilawa.el-css.edu.om/pages/${('000' + randompagenumber).slice(-3)}.jpg`
                }
                className={`img-fluid m-x-auto ${isrecording || isrecorded ? 'p-y-3' : ''}`}
              />
              <div
                className={`${isrecording || isrecorded ? 'hidden-xs-up' : ''}
                p-quran-pagev2__page-container__message alert alert-info`}
              >
                سيتم إظهار الصفحة عند بدأ التسجيل
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  _setRecorderInstance = (instance) => {
    const { setRecorderInstance } = this.props
    setRecorderInstance(instance)
  }
  _checkEnabled = () => {
    const { params: { subjectId }, subjects, recordings, extendings } = this.props

    const { router } = this.context
    let extend = extendings.filter(e => e.subject_id === parseInt(subjectId, 10))
    extend = extend[extend.length - 1]
    const hasSubject = subjects.findIndex(s => s.id === parseInt(subjectId, 10)) >= 0
    const recordingIndex = Object.keys(recordings).find(i => recordings[i].subject_id === parseInt(subjectId, 10))
    const recording = recordings[recordingIndex]
    if (!hasSubject ||
      ((recording && !extend && recording.remaining <= 0) && (extend && extend.maximum_recordings <= 0))) {
      router.push('/student/exams')
    }
  }

  _handleStopRecordingPressed = () => {
    const { recordingStoped, setQuranRecorded } = this.props

    recordingStoped()

    setQuranRecorded()
  }

  _handleUploadProgress = (progress: number) => {}

  _showAccept = () => {
    const { params: { subjectId }, showModal } = this.props

    showModal('yesno', {
      tag: 'QURAN_RECORDING_ACCEPT',
      subjectId: subjectId,
      accept: 'نعم اعتمد التسجيل',
      refuse: 'لا٫ تراجع',
      body: 'عند اعتماد التسجيل، تلغى باقي المحاولات.',
      title: 'هل أنت متأكد من اعتماد التسجيل'
    }, false, true)
  }

  _showRetry = () => {
    const { params: { subjectId }, showModal } = this.props
    showModal('yesno', {
      tag: 'QURAN_RECORDING_RETRY',
      subjectId: subjectId,
      accept: 'نعم المحاولة مجددا',
      refuse: 'لا٫ تراجع',
      body: 'عند اعادة المحاولة يتم الغاء التسجيل الحالي.',
      title: 'هل أنت متأكد من إعادة المحاولة'
    }, false, true)
  }
  _handleOnRecordingStarted = () => {
    const { recordingStarted, decreaseRemaining, params: { subjectId } } = this.props
    recordingStarted()
    decreaseRemaining(subjectId)
  }
  _handleOnUploadDone = (videoId: string) => {
    const { storeQuranRecording, randompagenumber, params: { subjectId } } = this.props
    storeQuranRecording(subjectId, randompagenumber, videoId)
  }
}

export default RecordStep
