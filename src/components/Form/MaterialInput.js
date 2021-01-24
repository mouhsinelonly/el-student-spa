// @flow
import * as React from 'react'
// import css
import './MaterialInput.scss'
import Eye from 'components/Svg/Eye'

type PropsType = {
  required: boolean,
  checkmark: boolean,
  autocomplete: string,
  type: string,
  className: string,
  placeholder: string,
  label: string,
  disabled: boolean,
  lang: string,
  after?: boolean,
  afterText?: string,
  data: Object
};

type StateType = {
  type: string
};

class MaterialInput extends React.Component<PropsType, StateType> {
  state = {
    type: ''
  }
  static defaultProps = {
    required: false,
    checkmark: true,
    disabled: false,
    type: 'text',
    data: {},
    className: '',
    autocomplete: '',
    placeholder: '',
    lang: 'ar'
  }
  render (): React.Element<'div'> {
    const { className, required, type, lang, disabled, autocomplete,
      placeholder, label, afterText, after, checkmark, data } = this.props
    const { state } = this
    return (<div className='form-group'>
      <div className={`c-input__group ${className}`}>
        <div className={after && 'input-group'}>
          <input className={`c-input__inputMaterial
            ${(data.touched ? (!data.valid
            ? 'has-error'
            : (data.value !== '' ? 'has-success' : '')) : '')}
              ${(data.value ? 'has-value' : '')} form-control ${!label ? 'is-inline' : ''}`}
            required={required}
            type={state.type || type}
            lang={lang}
            disabled={disabled}
            autoComplete={autocomplete}
            accept='image/*'
            name={data.name}
            checked={data.checked}
            onBlur={data.onBlur}
            onChange={data.onChange}
            onDragStart={data.onDragStart}
            onDrop={data.onDrop}
            onFocus={data.onFocus}
            value={data.value}
            placeholder={placeholder} />
          <label className='c-input__label'>
            {label}
          </label>
          {after && <div className='input-group-addon'>{afterText}</div>}
        </div>
        {(data.touched && checkmark && data.valid && data.value !== '')
        ? <i className={`${after ? 'has-addon' : ''}
           ${'c-input__checkmark-success'} icon icon-small-check-green`} /> : null}
        {!checkmark ? <Eye onClick={this._togglePasswordVisibility}
          className='c-input__checkmark-success c-input__eye' /> : ''}
        {data.touched && data.error && <span className={'c-input__label-danger'}>{data.error}</span>}
      </div>
    </div>)
  }

  _togglePasswordVisibility = () => {
    const { type } = this.state
    this.setState((): Object => ({ type: type !== 'password' ? 'password' : 'text' }))
  }
}

export default MaterialInput
