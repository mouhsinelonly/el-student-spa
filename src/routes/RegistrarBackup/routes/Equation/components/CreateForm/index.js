import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
// import Form
import EquationForm from '../EquationForm'
// import form validation
import validation from './validation'
// import css

export const fields = [
  'id',
  'university',
  'grade',
  'level',
  'files[].id',
  'files[].type',
  'files[].attachments'
]

class CreateForm extends Component {
  constructor (props) {
    super(props)

    this.toggleAddForm = this.toggleAddForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  render () {
    const {handleSubmit, invalid} = this.props

    return (<div>
      <h1 className={`text-xs-center m-y-3 `}>
        <b>معلومات الدراسة</b>
      </h1>
      <div className='clearfix' />
      <EquationForm {...this.props.fields}
        uploadFile={this.uploadFile}
        invalid={invalid}
        onSubmit={handleSubmit(this.handleSubmit)} /></div>)
  }

  handleSubmit (fields) {
    const {changeFormPage} = this.props
    changeFormPage(2)
  }

  uploadFile (files, name) {
    const {uploadFile} = this.props
    uploadFile(files, name)
  }

  toggleAddForm () {
    const {hideAddEquation} = this.props
    hideAddEquation()
  }
}

CreateForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  changeFormPage: PropTypes.func,
  uploadFile: PropTypes.func,
  hideAddEquation: PropTypes.func
}

export default reduxForm({
  form: 'create_degree',
  fields,
  destroyOnUnmount: false,
  validate: validation
})(CreateForm)
