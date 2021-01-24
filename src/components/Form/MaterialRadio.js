// @flow
import * as React from 'react'
// import css
import './MaterialInput.scss'

type PropType = {
   data: Object,
   required: boolean,
   checked: boolean,
   value: string,
   type: string,
   label: string,
   isChanged: Function
};
class MaterialRadio extends React.Component<PropType> {
  static defaultProps = {
    required: false,
    type: 'radio',
    checked: false,
    isChanged: () => {}
  }

  render (): React.Element<'span'> {
    const { data, checked, required, value, label, type } = this.props
    return (<span><label htmlFor={data.name} className={`c-radio
      ${data.touched && data.error ? 'is-invalid' : ''}
    ${checked ? 'is-checked' : ''}`}>
      { label }
      <input className='inputRadio'
        required={required}
        checked={data.checked}
        onBlur={data.onBlur}
        name={data.name}
        onDragStart={data.onDragStart}
        onDrop={data.onDrop}
        onFocus={data.onFocus}
        type={type}
        value={value}
        onChange={this._onChange} />
    </label>
    </span>)
  }

  _onChange = (event: Object) => {
    const { data, isChanged } = this.props
    data.onChange(event) && isChanged(event)
  }
}

export default MaterialRadio
