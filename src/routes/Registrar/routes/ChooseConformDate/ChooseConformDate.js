// @flow
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'components/Loading'
import { getConformityDays, storeConformityDay } from '../../modules/registrar'
import './ChooseConformDate.scss'

const ChooseConformDate = (): React.Element => {
  const [activeDate, setActiveDate] = useState(null)
  const [daysList, setDaysList] = useState([])
  const dispatch = useDispatch()
  const { conformityDays, loadingConformityDays: loading } = useSelector(state => state.registrar)
  const daysKeys = Object.keys(conformityDays)

  useEffect(() => {
    if (daysKeys.length === 0) {
      dispatch(getConformityDays())
    }
  }, [])
  const _onSelect = (event) => {
    dispatch(storeConformityDay({ dayId: +event.target.dataset.id }))
  }
  const _onDayChange = (event) => {
    setActiveDate(event.target.value)
  }
  useEffect(() => {
    if (!activeDate && daysKeys.length > 0) {
      setActiveDate(conformityDays[daysKeys[0]].dayDate)
      setDaysList(daysKeys.reduce((all, next) => [ ...all, ...(
        all.findIndex(item => item.dayDate === conformityDays[next].dayDate) < 0 ? [(
          {
            dayDate: conformityDays[next].dayDate,
            dayName: conformityDays[next].dayName
          })] : []) ], []))
    }
  }, [conformityDays, daysKeys])

  const times = daysKeys.filter(key => conformityDays[key].dayDate === activeDate)
  const hasChosen = daysKeys.findIndex(key => conformityDays[key].chosen === 1) >= 0
  return (
    <div className='h-100 container'>
      <div className='row'>
        <div className='col-xs-10 col-xs-pull-1'>
          <h3 className='text-xs-center  p-y-2 m-t-2 font-weight-bold m-t-2 registrar-dashboard__heading'>
            اختيار توقيت الزيارة
          </h3>
          <div className='my-panel-white ChooseConformDate shadow-1'>
            <header className='p-a-2'>
              <h6>اختر اليوم أولا ثم اختر الوقت المناسب</h6>
              <small>باقي 10 أيام على غلق الاختيار</small>
            </header>
            <div className='ChooseConformDate__body'>
              {loading ? <div className='ChooseConformDate__body-overlay'><Loading /></div> : null}
              <div className='text-xs-center'>
                <select onChange={_onDayChange} className='ChooseConformDate__select'>
                  <option>إختر تاريخ</option>
                  {daysList.map(day => <option key={day.dayDate} value={day.dayDate}>{day.dayName} - {day.dayDate}</option>)}
                </select>
              </div>
              {times.map(time => <TimeRow onSelect={_onSelect}
                {...conformityDays[time]}
                key={conformityDays[time].id} />)}
              <div className='clearfix' />
              <div className='text-xs-center'>
                <Link to='/registrar' className='btn btn-gray m-l-2 p-x-3'>إلغاء</Link>
                <Link to='/registrar' style={{ pointerEvents: !hasChosen ? 'none' : null }} disabled={!hasChosen} className={`btn p-x-3 btn-${hasChosen ? 'success' : 'gray'}`}>تأكيد الاختيار</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>)
}

const TimeRow = ({ chosen, remaining, fromTime, toTime, id, onSelect }) => <div className='col-xs-12 col-md-3'>
  <div className={`my-panel-white shadow-1 text-xs-center ChooseConformDate__item m-b-1
       ${chosen && 'ChooseConformDate__item__chosen'}
       ${(remaining <= 0 && chosen <= 0) && 'ChooseConformDate__item__disabled'}
       `} style={{ overflow: 'hidden' }}>
    <h6 className='font-weight-bold p-t-2'>{fromTime.replace(/:[^:]*$/, '')} - <span>{toTime.replace(/:[^:]*$/, '')}</span></h6>
    {chosen !== 1 ? <div className='p-t-1 p-b-2 ChooseConformDate__item__remaining' style={{ fontSize: 14 }}>
      {remaining > 0 ? `متاح ل ${remaining} حاليا` : `استنفذ الحد المسموح`}
    </div> : null }
    {chosen === 1 ? <div className='p-t-1 p-b-2 ChooseConformDate__item__remaining' style={{ fontSize: 14 }}>
      &nbsp;
    </div> : null }
    {(remaining > 0 || chosen !== 0) ? <button
      onClick={onSelect}
      data-id={id}
      disabled={remaining <= 0}
      className=' btn-block btn btn-white ChooseConformDate__item__btn' style={{ borderRadius: 0, borderWidth: 0, borderTopWidth: 1 }}>
      {chosen ? 'تم الاختيار' : 'اختيار'}
    </button> : null }
  </div>
</div>

export default ChooseConformDate
