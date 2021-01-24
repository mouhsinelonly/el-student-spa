import React from 'react'
import PropTypes from 'prop-types'
// import css
import classes from './MaterialSelect.scss'

export const MaterialSelect = (props) => (<div className={classes['group']}>
  <input className={`${classes['inputMaterial']}
  ${(props.data.touched && (!props.data.valid ? classes['has-error'] : classes['has-success']))}
  ${(props.data.value ? classes['has-value'] : '')}  form-control`}
    required={props.required}
    type={props.type}
    {...props.data} />
  <label className={classes['label']}>
    {props.placeholder}
  </label>
  {props.data.touched && props.data.error && <span className={classes['label-danger']}>{props.data.error}</span>}
</div>)

MaterialSelect.propTypes = {
  data: PropTypes.object,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string
}

MaterialSelect.defaultProps = {
  required: false,
  type: 'text',
  data: {},
  placeholder: ''
}

export default MaterialSelect
