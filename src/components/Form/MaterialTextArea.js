import React from 'react'
import PropTypes from 'prop-types'
// import css
import './MaterialInput.scss'

export const MaterialTextArea = (props) => <div className={'c-input__group'}>
  <textarea className={`c-input__inputMaterial
  c-textarea
  ${(props.data.touched && (!props.data.valid ? 'has-error' : 'has-success'))}
  ${(props.data.value ? 'has-value' : '')} form-control ${props.className}`}
    required={props.required}
    checked={props.data.checked}
    onBlur={props.data.onBlur}
    onChange={props.data.onChange}
    onDragStart={props.data.onDragStart}
    onDrop={props.data.onDrop}
    onFocus={props.data.onFocus}
    value={props.data.value} />
  <label className='c-input__label'>
    {props.label}
  </label>
  {props.data.touched && props.data.error &&
    <span className='label label-danger'>{props.data.error}</span>}
</div>

MaterialTextArea.defaultProps = {
  required: false,
  className: ''
}

MaterialTextArea.propTypes = {
  required: PropTypes.bool,
  data: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string
}

export default MaterialTextArea
