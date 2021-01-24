// @flow
import React, { useState, useCallback, useMemo, useEffect } from 'react'
// import { DateField } from 'react-date-picker'
// import MaskedInput from 'react-text-mask'
import { domOnlyProps } from 'utils'
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
const YEARS = range(date.getFullYear() - 100, date.getFullYear())
const MONTHS = range(1, 12)
const getStringMonth = (month: number = 1): string => (month + ``).padStart(2, 0)
const getStringDay = (day: number = 1): string => (day + ``).padStart(2, 0)

const MaterialDate = (props: PropsType): React.Element<'div'> => {
  const { data, label } = props
  const date = useMemo((): Object => {
    return data.value ? data.value.split('-') : [ '01', '01', '1971' ]
  })

  const [day, setDay] = useState(date[0])
  const [month, setMonth] = useState(date[1])
  const [year, setYear] = useState(date[2])

  useEffect(() => {
    data.onChange(`${day}-${month}-${year}`)
  }, [day, month, year])
  const _onYearChange = useCallback((e: Object) => {
    setYear(e.target.value)
  })
  const _onDayChange = useCallback((e: Object) => {
    setDay(e.target.value)
  })
  const _onMonthChange = useCallback((e: Object) => {
    setMonth(e.target.value)
  })
  const DAYS = useMemo((): number => {
    return range(1, new Date(year, month, 0).getDate())
  }, [ year, month ])

  return (
    <div>
      <div className='p-b-2'>{label}</div>
      <div className={'c-input__group m-l-1'} style={{ minWidth: 100, display: 'inline-block' }}>
        <input type='hidden' {...domOnlyProps(data)} />
        <select style={{ width: '100%' }} defaultValue={year} className='c-input__inputMaterial has-value'
          onChange={_onYearChange}>
          {YEARS.map((i: number): React.Element<'option'> => <option key={i} value={i}>{i}</option>)}
        </select>
        {// <MaskedInput
        //   value={data.value}
        //   className={`c-input__inputMaterial has-value
        //   is-date
        // ${data.dirty && (!data.valid ? 'has-error' : data.value !== '' ? 'has-success' : '')}
        // ${data.value ? 'has-value' : ''} form-control ${!label ? 'is-inline' : ''}`}
        //   mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        //   onChange={_onChange} />
        /* <i className={`icon icon-calendar-gray ${classes['calendar-gray']}`}></i> */}
        <label className='c-input__label'>
          السنة
        </label>
      </div>
      <div className='c-input__group m-l-1' style={{ minWidth: 100, display: 'inline-block' }}>
        <select style={{ width: '100%' }} defaultValue={month} className='c-input__inputMaterial has-value'
          onChange={_onMonthChange}>
          {MONTHS.map((i: number): React.Element<'option'> => <option key={i} value={getStringMonth(i)}>
            {i}</option>)}
        </select>
        <label className='c-input__label'>
          الشهر
        </label>
      </div>
      <div className='c-input__group' style={{ minWidth: 100, display: 'inline-block' }}>
        <select style={{ width: '100%' }} defaultValue={day} className='c-input__inputMaterial has-value'
          onChange={_onDayChange}>
          {DAYS.map((i: number): React.Element<'option'> => <option key={i} value={getStringDay(i)}>
            {i}</option>)}
        </select>
        <label className='c-input__label'>
          اليوم
        </label>
      </div>
      <Calendar className='c-input__icon m-t-1 hidden-xs-up' />
      {data.dirty && data.error && <span className={'c-input__label-danger'}>{data.error}</span>}
    </div>
  )
}

export default MaterialDate
