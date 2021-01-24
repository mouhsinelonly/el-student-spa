import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'
import MaterialFile from 'components/Form/MaterialFile'
import validation from './validation'
import MaterialTextArea from 'components/Form/MaterialTextArea'

const fields = [
  'files[].id',
  'files[].preview',
  'content',
  'session_id'
]

class UploadForm extends Component {
  static propTypes = {
    fields: PropTypes.object,
    onNext: PropTypes.func,
    handleSubmit: PropTypes.func,
    uploadFile: PropTypes.func,
    invalid: PropTypes.bool
  }
  constructor (props) {
    super(props)

    this._uploadFile = this._uploadFile.bind(this)
  }
  render () {
    const { handleSubmit, fields: { files, content }, invalid } = this.props

    return [<h4 className='p-b-3 text-xs-center'><b>ارفع وثيقة اثبات</b></h4>,
    <form onSubmit={handleSubmit} className='c-student-session-excuse-upload-form shadow-1'>
      <section className='c-student-session-excuse-upload-form__section p-a-2'>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <MaterialFile label='رفع وثيقة اثبات'
              name='file'
              icon='docs-gray-medium'
              onDrop={this._uploadFile} />
          </div>
        </div>
        <div className='clearfix' />
        <div className='row m-t-2'>
          {
            files.map(f => <div className='col-xs-6 col-md-3' key={f.id.value}>
              <img className='img-fluid m-b-2 c-student-session-excuse-upload-form__thumb' src={f.preview.value} />
            </div>)
          }
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-8 col-lg-6'>
            <MaterialTextArea label='ارفاق نص' type='content'
              data={content}
              className='c-student-session-excuse-upload-form__text' />
          </div>
        </div>
      </section>
      <footer className='c-student-session-excuse-upload-form__footer p-a-2 text-xs-center'>
        <button onClick={this._onPrevious} className='btn btn-xs btn-success p-x-3 m-l-1'>
            السابق
        </button>
        <button disabled={invalid || !files.length} className='btn btn-xs btn-success p-x-3'>
            أرسل الطلب
        </button>
      </footer>
    </form>]
  }
  _onPrevious = () => {
    const { onNext } = this.props
    onNext(1)
  }
  _uploadFile (formFiles) {
    const { uploadFile, fields: { files } } = this.props

    uploadFile(formFiles, 'file').then(res => {
      files.addField({ id: res.body.id, preview: res.body.file.original })
    })
  }
}

export default reduxForm({
  fields,
  form: 'sessionexcuseform',
  destroyOnUnmount: true,
  validate: validation
})(UploadForm)
