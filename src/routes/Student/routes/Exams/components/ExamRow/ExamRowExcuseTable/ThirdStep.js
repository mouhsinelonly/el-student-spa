import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileInput from 'components/Form/MaterialFile'
import Icon from 'components/Icon'
import Loading from 'components/Loading'

class ThirdStep extends Component {
  constructor (props) {
    super(props)

    this._uploadFile = this._uploadFile.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
  }
  static propTypes = {
    uploadFile: PropTypes.func,
    sendExamExcuse: PropTypes.func,
    goToExcuseStep: PropTypes.func,
    sendingexcuse: PropTypes.bool,
    files: PropTypes.array
  }
  static defaultProps = {
    files: []
  }
  render () {
    const { files, sendingexcuse } = this.props
    // console.log(files)
    return (<div className='clearfix'>
      <h4 className='p-b-3 text-xs-center'><b>رفع وثيقة الإثبات</b></h4>

      <div className='col-xs-12 col-md-4 col-md-pull-4 text-xs-center  p-b-3'>
        <FileInput files={[]}
          name={'examexcusefile'}
          onDrop={(files) => this._uploadFile(files, 'examexcusefile')} >
          <Icon className={'m-l-2'} name='docs-gray-medium' /> اختيار وثيقة
        </FileInput>
      </div>
      <div className='clearfix' />
      {files.map((file, i) =>
        <div className='col-xs-12 col-md-4 col-lg-3' key={i}>
          <img className='img-fluid' src={file.preview} />
        </div>)
    }
      <div className='clearfix' />
      <footer className='text-xs-center p-y-3 c-exam-row-excuse-table__footer m-t-3' >
        <button className='btn btn-gray btn-lg p-x-3' disabled={files.length === 0 || sendingexcuse}
          onClick={this._next}>
          <span className={`${sendingexcuse && 'hidden-xs-up'}`}>إرسال</span>
          <Loading className={`${!sendingexcuse && 'hidden-xs-up'}`} />
        </button>
        <div onClick={this._prev} className='c-exam-row-excuse-table__prev'>الرجوع للسابق</div>
      </footer>
    </div>)
  }

  _uploadFile (files, name) {
    const { uploadFile } = this.props
    uploadFile(files, name)
  }

  _next () {
    const { sendExamExcuse } = this.props
    sendExamExcuse()
  }

  _prev () {
    const { goToExcuseStep } = this.props
    goToExcuseStep(2)
  }
}

export default ThirdStep
