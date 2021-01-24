// @flow
import * as React from 'react'
// import { DateField } from 'react-date-picker'
import MaskedInput from 'react-text-mask'
// import css
import './MaterialInput.scss'
// import 'react-date-picker/index.css'
import Calendar from 'components/Svg/Calendar'

type PropsType = {
  data: Object,
  label: string
};

const range = (start: number, end: number): Array<number> => (
  Array.from(Array(end - start + 1).keys()).map((i: number): Array<number> => i + start)
)

const date = new Date()
const YEARS = range(date.getFullYear() - 100, date.getFullYear() - 16)

class MaterialDate extends React.Component<PropsType> {
  static defaultProps = {
    required: false,
    type: 'text'
  }
  render (): React.Element<'div'> {
    const { data, label } = this.props

    return (
      <div>
        <div className={'c-input__group'}>
          <MaskedInput
            value={data.value}
            className={`c-input__inputMaterial
            is-date
          ${data.dirty && (!data.valid ? 'has-error' : data.value !== '' ? 'has-success' : '')}
          ${data.value ? 'has-value' : ''} form-control ${!label ? 'is-inline' : ''}`}
            mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            onChange={this._onChange} />
          {/* <i className={`icon icon-calendar-gray ${classes['calendar-gray']}`}></i> */}
          <label className='c-input__label'>
            {label}
          </label>
          <Calendar className='c-input__icon' />
        </div>
        {data.dirty && data.error && <span className={'c-input__label-danger'}>{data.error}</span>}
      </div>
    )
  }

  _onChange = (e) => {
    const { data: { onChange } } = this.props
    onChange(e.target.value)
  }
}

export default MaterialDate
