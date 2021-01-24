import React from 'react'
import PropTypes from 'prop-types'
// import css
import './Select.scss'
import inputClasses from '../MaterialInput.scss'

function Select (props) {
  return (
    <div>
      <div className='c-input__group'>
        <select
          className={`c-form-select ${props.data.touched ? (!props.data.valid ? 'has-error' : 'has-success') : ''}
            ${props.data.value ? 'has-value' : ''} form-control`}
          required={props.required}
          value={props.data.value || ''}
          checked={props.data.checked}
          value={props.data.value}
          onChange={event => {
            props.data.onChange(event)
            typeof props.isChanged !== 'undefined' ? props.isChanged(event) : null
          }}
        >
          <option value=''>{props.label || ''}</option>
          {props.options.map((o, i) => (
            <option key={i} value={o.value}>
              {o.text}
            </option>
          ))}
        </select>
        {props.data.value !== '' && <label className={`c-input__label t-r`}>{props.label}</label>}
      </div>
      {props.data.touched &&
        props.data.error && <span className='c-form-select__label-danger'>{props.data.error}</span>}
    </div>
  )
}

Select.propTypes = {
  data: PropTypes.object,
  required: PropTypes.bool,
  isChanged: PropTypes.func,
  options: PropTypes.array,
  label: PropTypes.string
}
Select.defaultProps = {
  required: false,
  options: []
}

export default Select
