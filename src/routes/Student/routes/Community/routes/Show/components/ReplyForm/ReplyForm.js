// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { domOnlyProps } from 'utils'
import { reduxForm } from 'redux-form'
import './style.scss'
import validation from './validation'

const fields = [
  'content',
  'parentId',
  'open'
]

type PropsType = {
  fields: Object,
  invalid: boolean,
  handleSubmit: Function,
  resetForm: Function
};

class ReplyForm extends React.Component<PropsType> {
  node = React.createRef()
  componentDidMount () {
    document && document.addEventListener('mousedown', this._handleClick, false)
  }
  componentWillUnmount () {
    document && document.removeEventListener('mousedown', this._handleClick, false)
  }
  render (): React.Element<'form'> {
    const {
      fields: { content, parentId, open },
      handleSubmit,
      invalid
    } = this.props

    return (<form onSubmit={handleSubmit(this._handleSubmit)} ref={this.node}>
      <input type='hidden' {...domOnlyProps(parentId)} />
      <textarea
        className={`form-control ${open.value && 'is-open'} student-community-replyform__content m-t-3`}
        {...domOnlyProps(content)}
        // onClick={this._contentIsClicked}
        placeholder='اثري النقاش باجابتك' />
      {content.dirty && content.invalid ? <span className='label label-danger' >{content.error}</span> : null}
      <div className='clearfix' />
      {open.value ? <button disabled={invalid} className='btn btn-success student-community-replyform__action m-t-1'>
        آنشر
      </button> : null}
    </form>)
  }
  _handleSubmit = () => {
    const { handleSubmit, resetForm } = this.props
    handleSubmit()
    resetForm()
  }

  _handleClick = (e: Object) => {
    const { fields: { open } } = this.props
    if (this.node.current && this.node.current.contains(e.target)) {
      open.onChange(true)
      return
    }
    open.onChange(false)
  }
}

export default reduxForm({
  form: 'ReplyForm',
  fields: fields,
  validate: validation
  // destroyOnUnmount: true
})(ReplyForm)
