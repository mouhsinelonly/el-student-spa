import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'redux-form'
import './style.scss'
import MaterialFile from 'components/Form/MaterialFile'
import validation from './validation'

const fields = [
  'files[].id',
  'files[].preview',
  'reason',
  'subject_id'
]

class UploadForm extends Component {
  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    uploadFile: PropTypes.func,
    invalid: PropTypes.bool
  }
  constructor (props) {
    super(props)

    this._uploadFile = this._uploadFile.bind(this)
  }
  render () {
    const {handleSubmit, fields: {files}, invalid} = this.props

    return (<form onSubmit={handleSubmit} className='c-student-delay-order-upload-form shadow-1'>
      <section className='c-student-delay-order-upload-form__section p-a-2'>
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
              <img className='img-fluid m-b-2 c-student-delay-order-upload-form__thumb' src={f.preview.value} />
            </div>)
          }
        </div>

      </section>
      <footer className='c-student-delay-order-upload-form__footer p-a-2 text-xs-center'>
        <button disabled={invalid || !files.length} className='btn btn-xs btn-success p-x-3'>
            أرسل الطلب
        </button>
      </footer>
    </form>)
  }

  _uploadFile (formFiles) {
    const {uploadFile, fields: {files}} = this.props

    uploadFile(formFiles, 'file').then(res => {
      files.addField({id: res.body.id, preview: res.body.file.original})
    })
  }
}

export default reduxForm({
  fields,
  form: 'quranrecordingform',
  destroyOnUnmount: false,
  validate: validation
})(UploadForm)

