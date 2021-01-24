// @flow
import * as React from 'react'
import { domOnlyProps } from 'utils'
import './style.scss'

type PropsType = {
  options: Array<Object>,
  data: Object,
  ignoreValue: number
};

type StateType = {
  open: boolean,
  text: string
};

class DropDown extends React.Component<PropsType, StateType> {
  state = { open: false, text: '' }
  static defaultProps = { ignoreValue : 0 }
  render (): React.Element<'div'> {
    const { data, options, ignoreValue } = this.props
    const { open, text } = this.state
    const isChecked = data.value && (parseInt(data.value) !== ignoreValue)

    return (
      <div className={`c-input-dropdown ${open ? 'is-open' : ''}`}>
        <input type='hidden' {...domOnlyProps(data)} />
        <div className={`c-input-dropdown__selected ${!isChecked ? '' : 'is-selected'}`} onClick={this._toggle}>
          {isChecked ? text : 'غير عماني'}
          <i className='material-icons c-input-dropdown__icon'>keyboard_arrow_down</i>
        </div>
        <div className={`${open ? 'is-open' : ''} c-input-dropdown__items`}>
          {options ? options.map((o: Object): React.Element<typeof DropDownItem> =>
            <DropDownItem {...o} key={o.value} onChange={this._onChange}
              selected={o.value === parseInt(data.value)} />) : null}
        </div>
      </div>
    )
  }
  _toggle = () => {
    const { open } = this.state
    this.setState((): Object => ({ open: !open }))
  }

  _onChange = (e: Object) => {
    const { data } = this.props
    const { target } = e
    this.setState((): Object => ({ text: target.dataset.text, open: false }))
    data.onChange(target.dataset.id)
  }
}

type ItemType = {
  text: string,
  value: string,
  selected: boolean,
  onChange: Function
};

const DropDownItem = (props: ItemType): React.Element<'div'> => {
  return (
    <div key={props.value} data-id={props.value}
      className={`c-input-dropdown__item ${props.selected ? 'is-selected' : ''}`}
      data-text={props.text} onClick={props.onChange} >{props.text}</div>
  )
}

export default DropDown
