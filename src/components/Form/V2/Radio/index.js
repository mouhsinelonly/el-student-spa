// @flow
import * as React from 'react'
import Icon from 'components/Icon'

// import css
import './style.scss'

type PropType = {
   data: Object,
   required: boolean,
   checked: boolean,
   value: string,
   label: string,
   isChanged: Function
};
class Radio extends React.Component<PropType> {
  static defaultProps = {
    required: false,
    type: 'text',
    checked: false,
    isChanged: () => {}
  }

  render (): React.Element<'label'> {
    const { data, required, value, label } = this.props
    return (<label htmlFor={data.name} className={`input-radio-v2
    ${data.value === value ? 'is-checked' : ''}`}>
      { label }
      <i className='material-icons input-radio-v2__checkbox'>check</i>
      <input
        required={required}
        checked={data.checked}
        onBlur={data.onBlur}
        name={data.name}
        onDragStart={data.onDragStart}
        onDrop={data.onDrop}
        onFocus={data.onFocus}
        type='radio'
        value={value}
        onChange={this._onChange} />
    </label>)
  }

  _onChange = (event: Object) => {
    const { data, isChanged } = this.props
    data.onChange(event) && isChanged(event)
  }
}

export default Radio
