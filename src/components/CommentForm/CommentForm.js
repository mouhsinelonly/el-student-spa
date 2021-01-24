import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'
import Loading from 'components/Loading'
import { domOnlyProps } from 'utils'
import TextareaAutosize from 'react-autosize-textarea'

// import validation rules
import validation from './validation'
// form fields
export const fileName = 'photo'
export const fields = ['subject', 'content', 'open']

class CommentForm extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    placeHolder: PropTypes.string,
    subjectPlaceHolder: PropTypes.string,
    contentPlaceHolder: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    invalid: PropTypes.bool,
    valid: PropTypes.bool,
    files: PropTypes.array,
    insertingIds: PropTypes.array,
    previousPage: PropTypes.array,
    resetForm: PropTypes.func,
    uploadFile: PropTypes.func
  }
  render () {
    const {
      fields: { subject, content, open },
      placeHolder,
      invalid,
      id,
      insertingIds,
      subjectPlaceHolder,
      contentPlaceHolder,
      handleSubmit
    } = this.props

    if (insertingIds.findIndex(i => parseInt(i, 10) === id) > -1 && open.value === 1) return <Loading />

    return (
      <div>
        {!open.value ? (
          <div onClick={this._showForm} className={`c-comment-form__placeholder m-b-3`}>
            {placeHolder}
          </div>
        ) : null}
        {open.value ? (
          <form onSubmit={handleSubmit(this._onSubmit)}>
            <label className='c-comment-form__label'>العنوان</label>
            <input
              tabIndex='1'
              autoFocus
              type='text'
              {...domOnlyProps(subject)}
              placeholder={subjectPlaceHolder}
              className='c-comment-form__subject form-control m-b-2 p-y-1'
            />
            <label className='c-comment-form__label'>الوصف</label>
            {/* <textarea tabIndex='2'
          {...domOnlyProps(content)} className='c-comment-form__content form-control m-b-2 p-y-1'
            placeholder={contentPlaceHolder} /> */}
            <TextareaAutosize
              {...domOnlyProps(content)}
              className='c-comment-form__content'
              placeholder={contentPlaceHolder}
            />
            <button disabled={invalid} className='m-t-3 btn btn-lg btn-success p-x-3'>
              أنشر
            </button>
          </form>
        ) : null}
      </div>
    )
  }
  _onSubmit = () => {
    const { resetForm, handleSubmit, fields: { open } } = this.props
    handleSubmit()
    resetForm()
    open.onChange(0)
  }
  _showForm = () => {
    const { fields: { open } } = this.props
    open.onChange(1)
  }
  _previousPage = () => {
    const { previousPage } = this.props
    previousPage()
  }
  uploadFile = files => {
    const { uploadFile } = this.props
    uploadFile(files, fileName)
  }
}

export default reduxForm({
  fields: fields,
  validate: validation,
  destroyOnUnmount: true
})(CommentForm)
