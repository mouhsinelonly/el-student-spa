import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validation from './validation'
import Icon from 'components/Icon'
import TextareaAutosize from 'react-autosize-textarea'
import Select from 'components/Form/Select'

const fields = ['subject', 'body', 'category_id']
class NewTicket extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    categories: PropTypes.array
  }
  render () {
    const { fields: { subject, body, category_id }, handleSubmit, invalid, categories } = this.props
    const options = categories.map(d => ({
      value: d.id,
      text: d.name
    }))
    return (
      <form onSubmit={handleSubmit} className='c-chatbox-new-form p-a-2'>
        <input
          type='text'
          {...domOnlyProps(subject)}
          placeholder='العنوان'
          className='hidden-xs-up form-control m-b-2'
        />
        <TextareaAutosize
          {...domOnlyProps(body)}
          autoFocus
          placeholder='نص الإستفسار'
          className='c-chatbox-new-form__textarea form-control m-b-2'
        />
        <button disabled={invalid} className='btn btn-info btn-lg'>
          <Icon name='send-white-right' className='m-l-1' /> أرسل الرسالة
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'ticketform',
  fields,
  validate: validation,
  destroyOnUnmount: true
})(NewTicket)
