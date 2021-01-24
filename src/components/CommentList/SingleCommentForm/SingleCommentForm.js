import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validation from './validation'
import './style.scss'
import Loading from 'components/Loading'

const fields = ['content', 'parentId', 'open']

class SingleCommentForm extends React.Component {
  static propTypes = {
    placeHolder: PropTypes.string,
    id: PropTypes.number,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    insertingIds: PropTypes.array,
    resetForm: PropTypes.func
  }
  static defaultProps = {
    insertingIds: [],
    id: 0
  }
  render () {
    const { fields: { content, open }, invalid, insertingIds, id, placeHolder, handleSubmit } = this.props

    if (insertingIds.findIndex(i => parseInt(i, 10) === id) > -1 && open.value === 1) return <Loading />

    return (
      <form className='row' onSubmit={handleSubmit(this._handleSubmit)}>
        <div className={open.value === 1 ? 'col-xs-9' : 'col-xs-12'}>
          <textarea
            {...domOnlyProps(content)}
            onClick={this._showForm}
            onBlur={this._hideForm}
            className='form-control'
            placeholder={placeHolder}
          />
        </div>
        {open.value === 1 ? (
          <div className='col-xs-3 p-r-0'>
            <button disabled={invalid} className='c-single-comment-form__send btn btn-success btn-block'>
              أنشر
            </button>
          </div>
        ) : null}
      </form>
    )
  }
  _handleSubmit = () => {
    const { handleSubmit, resetForm } = this.props
    handleSubmit()
    resetForm()
    this.props.fields.open.onChange(0)
  }
  _showForm = () => {
    this.props.fields.open.onChange(1)
  }
  _hideForm = () => {
    const { fields: { open, content } } = this.props
    if (content.value === '') {
      open.onChange(0)
    }
  }
}

export default reduxForm(
  {
    fields: fields,
    validate: validation,
    destroyOnUnmount: true
  },
  (state, props) => ({
    initialValues: { parentId: props.parentId }
  })
)(SingleCommentForm)
