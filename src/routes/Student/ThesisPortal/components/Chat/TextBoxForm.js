// @flow
import React from 'react'
import { reduxForm } from 'redux-form'
import { sendMessage } from 'routes/Student/modules/thesis'
import { domOnlyProps } from 'utils'
import { useDispatch } from 'react-redux'
import './TextBoxForm.scss'

type PropertiesType = {
  handleSubmit: Function,
  fields: Object,
  disabled: boolean
};

const fields = [
  'content'
]

const TextBoxForm = ({ handleSubmit, fields: { content }, disabled }: PropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const _handleKeyUp = (event: Object) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      dispatch(sendMessage({ content: event.currentTarget.value }))
      event.currentTarget.value = ''
    }
  }
  return <form onSubmit={handleSubmit}
    className='TextBoxForm'>
    <fieldset disabled={disabled}>
      <textarea
        onKeyUp={_handleKeyUp}
        className='TextBoxForm__input form-control'
        {...domOnlyProps(content)}
        placeholder='رسالتك...'
      />
    </fieldset>
  </form>
}

export default reduxForm({ form: 'thesisChatForm', fields })(TextBoxForm)
