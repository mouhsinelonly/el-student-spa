import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import ReactQuill from 'react-quill'
import TextareaAutosize from 'react-autosize-textarea'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validation from './validation'
import Loading from 'components/Loading'

export const fields = ['subject', 'content']

class Create extends Component {
  static propTypes = {
    fields: PropTypes.object,
    createCommunityPost: PropTypes.func,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    inserting: PropTypes.bool
  }
  static contextTypes = {
    router: PropTypes.object
  }
  constructor (props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    const { fields: { subject, content }, handleSubmit, inserting, invalid } = this.props
    // console.log(subject)
    if (inserting) {
      return (
        <div className='m-t-3'>
          <Loading />
        </div>
      )
    }
    // console.log(content.value)
    return (
      <div className='container'>
        <div className='row'>
          <form
            onSubmit={handleSubmit(this._handleSubmit)}
            className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'
          >
            <h6 className='p-y-3 m-b-0'>إضافة نقاش جديد</h6>
            <div className='student-community-create__input-container'>
              <input
                {...domOnlyProps(subject)}
                placeholder='أدخل عنوان النقاش أو الإستفسار'
                type='text'
                className='student-community-create__subject'
              />
              <TextareaAutosize
                {...domOnlyProps(content)}
                placeholder='ادخل نص الموضوع'
                className='student-community-create__content'
              />
              <div className='clearfix' />
            </div>
            <small className={content.valid ? 'hidden-xs-up' : ''}>نص الموضوع يجب ان يكون على الاقل 10 حروف.</small>
            <br />
            <small className={subject.valid ? 'hidden-xs-up' : ''}>العنوان يجب ان يكون على الاقل 5 حروف.</small>
            <button
              disabled={invalid}
              className='btn btn-success btn-lg m-x-auto m-t-3'
              style={{ display: 'block', width: 250 }}
            >
              إضافة للنقاش
            </button>
          </form>
        </div>
      </div>
    )
  }
  _handleSubmit (values) {
    const { createCommunityPost } = this.props
    const { router } = this.context
    createCommunityPost(values).then(res => {
      router.push('/student/community')
    })
  }
}

export default reduxForm({
  form: 'CreateCommunityPost',
  fields: fields,
  validate: validation,
  destroyOnUnmount: true
})(Create)
