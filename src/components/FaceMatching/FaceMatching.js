import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Webcam from 'react-webcam'
import Loading from 'components/Loading'
import Icon from 'components/Icon'
import './style.scss'

const Webcam = () => <div />
class FaceMatching extends React.Component {
  faceImage
  faceCanva
  static propTypes = {
    matchFace: PropTypes.func,
    processing: PropTypes.bool,
    ratio: PropTypes.number,
    exception: PropTypes.string,
    enabled: PropTypes.bool,
    settings: PropTypes.array,
    done: PropTypes.bool,
    match: PropTypes.bool
  }
  render () {
    const { processing, match, done, ratio, exception, settings, enabled, profile: { state, photo } } = this.props

    if (!state || !photo) return false

    const faceMatchSetting = settings.find(s => s.slug === 'aws_face_match')
    const maxTries = faceMatchSetting ? parseInt(faceMatchSetting.value, 10) : 0

    return (
      <div className={`c-facematching__window shadow-1 p-y-2 ${ratio}`}>
        <p className='p-a-2'>
          هنا يمكنك تجربة التحقق من الصورة الشخصية ٫ إذا لم تنجح عملية المطابقة فعليك سرعة التواصل مع الدعم الفني لتعديل
          الصورة الشخصية بصورة أخرى أكثر وضوحا.
        </p>
        <div className='text-info text-xs-right m-a-2'>
        المرجو التاكد من التالي عند التحقق من الصورة :
        <ol>
          <li>يجب ان تكون الاضاءة جيدة.</li>
          <li>عدم وجود انعكاسات ضوئية.</li>
          <li>يجب ان يكون الوجه قريب من الكاميرا.</li>
          <li>يجب ان يكون الوجه واضح و عدم وجود ضباب في الكاميرا.</li>
          <li>عدم ارتداء نظارات.</li>
        </ol>
        </div>
        <div className={`c-facematching__img-con ${!processing ? 'hidden-xs-up' : ''}`}>
          <img ref={image => (this.faceImage = image)} className='hidden-xs-up' />
          <canvas ref={canvas => (this.faceCanvas = canvas)} width={320} height={240} className='img-fluid' />
          <div className={`c-facematching__analyzer`} />
        </div>
        <div className={`embed-responsive embed-responsive-16by9 ${processing ? 'hidden-xs-up' : ''}`}>
          <div className='c-facematching__webcam'>
            <Webcam
              className={`c-facematching__canvas`}
              ref='webcam'
              audio={false}
              width={320}
              height={240}
              screenshotFormat='image/png'
            />
          </div>
        </div>
        <div className='clearfix' />
        <Loading className={`${!processing ? 'hidden-xs-up' : ''} m-t-2`} />
        <div className={`${!match || !done ? 'hidden-xs-up' : ''} text-success p-a-2`}>
          <Icon name='check-single-green' className='m-l-1' />
          تمت المطابقة بنجاح
        </div>
        <div className={`${match || !done ? 'hidden-xs-up' : ''} text-danger p-a-2 text-xs-center`}>
          {exception}
        </div>
        <div className='clearfix' />
        <button
          type='button'
          disabled={maxTries <= 0}
          className={`btn btn-success m-t-2 ${processing ? 'hidden-xs-up' : ''}`}
          onClick={this._screenShot}
        >
          {!done ? 'التحقق' : 'التحقق مرة أخرى'}
        </button>
        <p className={`p-y-1 p-x-3 text-info ${maxTries > 0 ? 'hidden-xs-up' : ''}`}>
          لم يتبقى لك اي محاولة تجربة تحقق
        </p>
        <p className={`p-y-1 p-x-3 text-info ${maxTries <= 0 ? 'hidden-xs-up' : ''}`}>
          عدد محاولات تجربة التحقق المتبقية لك {maxTries}
        </p>
      </div>
    )
  }

  _screenShot = () => {
    const { matchFace } = this.props
    const screenshot = this.refs.webcam.getScreenshot()

    if (this.faceImage) {
      this.faceImage.src = screenshot
      this.faceImage.onload = () => {
        if (this.faceCanvas) {
          const context = this.faceCanvas.getContext('2d')
          // $FlowIssue fix drawImage
          context.drawImage(this.faceImage, 0, 0, 320, 240)
        }
      }
    }
    // this.forceUpdate()
    matchFace(screenshot)
  }
}

export default FaceMatching
