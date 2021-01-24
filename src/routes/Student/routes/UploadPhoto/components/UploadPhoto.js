import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import './styles.scss'
import Loading from 'components/Loading'
import DropZone from 'react-dropzone'
const fileKey = 'student_photo'

class UploadPhoto extends Component {
  static propTypes = {
    uploadingphoto: PropTypes.bool,
    uploaddone: PropTypes.bool,
    profile: PropTypes.object,
    uploadReset: PropTypes.func,
    uploadPhoto: PropTypes.func.isRequired,
    files: PropTypes.array
  }
  constructor (props) {
    super(props)

    this._onDrop = this._onDrop.bind(this)
    this._resetUpload = this._resetUpload.bind(this)
    this._onAccept = this._onAccept.bind(this)
  }
  _onDrop (files) {
    const {uploadPhoto} = this.props
    uploadPhoto(files, fileKey)
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render () {
    const {files, uploadingphoto, uploaddone, profile: {photo: {medium}}} = this.props
    // console.log(medium)
    // const file = files.find(f => f.id === fileKey)
    return (
      <div className='p-upload-photo'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-4 col-md-pull-4 text-xs-center'>
              <DropZone multiple={false} accept={'image/*'}
                className={`p-upload-photo__dropzone ${uploaddone && 'hidden-xs-up'}`}
                onDrop={this._onDrop}>
                <Loading className={`${!uploadingphoto && 'hidden-xs-up'}`} />
                <Icon name='camera-gray' className={`${uploadingphoto && 'hidden-xs-up'}`} />
                <div className={`${uploadingphoto && 'hidden-xs-up'} p-y-2`} >
                  رفع الصورة
                </div>
              </DropZone>
              <div className={`${!uploaddone && 'hidden-xs-up'}`}>
                <div className={`p-upload-photo__dropzone has-photo`}>
                  <img src={medium} className='p-upload-photo__dropzone__photo' />
                </div>
                <div className='clearfix m-a-1' />
                <button className='btn btn-gray p-x-2' onClick={this._resetUpload}>
                  تغيير الصورة
                </button>
                <button className='btn btn-success m-r-2 p-x-2' onClick={this._onAccept}>
                  حفظ و انتهاء
                </button>
              </div>
            </div>
          </div>
          <div className='clearfix m-t-3 m-b-2' />
          <div className='row m-t-3'>
            <h4 className='text-xs-center m-b-3'><b>مواصفات الصورة</b></h4>
            <div className='col-xs-12 col-md-10 col-md-pull-1'>
              <div className='col-xs-12 col-md-4'>
                <Icon name='upload-cond1' className='m-b-2' />
                <p>
                  استخدم صورة بنفس مواصفات الصورة التي يتم تصويرها <b>لجواز السفر</b>.
                </p>
              </div>
              <div className='col-xs-12 col-md-4'>
                <Icon name='upload-cond2' className='m-b-2' />
                <p>
                  قم بتقطيع الصورة بشكل مستقيم، و لا تترك مكان للمساحة البيضاء.
                </p>
              </div>
              <div className='col-xs-12 col-md-4'>
                <Icon name='upload-cond3' className='m-b-2' />
                <p>
                  احرص على جودة الصورة، بحيث تكون واضحة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  _resetUpload () {
    const {uploadReset} = this.props
    uploadReset()
  }
  _onAccept () {
    const {router} = this.context
    router.push('/student')
  }
}

export default UploadPhoto
