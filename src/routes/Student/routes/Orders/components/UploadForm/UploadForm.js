import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'
import MaterialFile from 'components/Form/MaterialFile'
import MaterialInput from 'components/Form/MaterialInput'
import validation from './validation'

const fields = [
  'files[].id',
  'files[].preview',
  'reason',
  'bank_name',
  'bank_account_name',
  'bank_account_number'
]

class UploadForm extends Component {
  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    uploadFile: PropTypes.func,
    invalid: PropTypes.bool
  }

  render () {
    const { handleSubmit, fields:
      { files, bank_name: bankName, bank_account_number: accountNumber, bank_account_name: accountName },
       invalid } = this.props

    return (<form onSubmit={handleSubmit} className='c-order-upload-form shadow-1'>
      <section className='c-order-upload-form__section p-a-2'>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <MaterialFile label='رفع وثيقة اثبات'
              name='file'
              icon='docs-gray-medium'
              onDrop={this._uploadFile} />
          </div>
          <div className='clearfix m-b-2' />
          <div className='col-xs-12 col-md-4'>
            <MaterialInput label='إسم بنكك' data={bankName} />
          </div>
          <div className='col-xs-12 col-md-4'>
            <MaterialInput label='إسم صاحب الحساب' data={accountName} />
          </div>
          <div className='col-xs-12 col-md-4'>
            <MaterialInput label='رقم الحساب البنكي' data={accountNumber} />
          </div>
        </div>
        <div className='clearfix' />
        <div className='row m-t-2'>
          {
            files.map(f => <div className='col-xs-6 col-md-3' key={f.id.value}>
              <img className='img-fluid m-b-2 c-order-upload-form__thumb' src={f.preview.value} />
            </div>)
          }
        </div>

      </section>
      <footer className='c-order-upload-form__footer p-a-2 text-xs-center'>
        <button disabled={invalid || !files.length} className='btn btn-xs btn-success p-x-3'>
            أرسل الطلب
        </button>
      </footer>
    </form>)
  }

  _uploadFile = (formFiles) => {
    const { uploadFile, fields: { files } } = this.props

    uploadFile(formFiles, 'file').then(res => {
      files.addField({ id: res.body.id, preview: res.body.file.original })
    })
  }
}

export default reduxForm({
  fields,
  form: 'delayform',
  destroyOnUnmount: false,
  validate: validation
})(UploadForm)
