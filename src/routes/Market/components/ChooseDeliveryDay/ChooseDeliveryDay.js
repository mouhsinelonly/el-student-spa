// @flow
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chooseDay } from 'routes/Student/modules/market'

import './ChooseDeliveryDay.scss'

type PropertiesType = {
  chosen: number
};

const ChooseDeliveryDay = ({ chosen }: PropertiesType): React.Element<'div'> => {
  const [ visible, setVisibility ] = useState(chosen <= 0)

  const dispatch = useDispatch()
  const onSelect = (event: Object) => {
    dispatch(chooseDay({ dayId: event.currentTarget.dataset.id }))
  }
  const { days } = useSelector((state: Object): Object => state.market)
  const daysKeys = Object.keys(days)
  const hasChosenDay = daysKeys.reduce((chosen, next) => chosen + days[next].chosen, 0)
  let data = null
  if (daysKeys.length <= 0) {
    return null;
  }
  if (!visible) {
  	const day = daysKeys.find((dayKey: string): boolean => days[dayKey].chosen === 1)
    data = <div className='my-panel-white shadow-1 m-t-3 m-b-3 p-a-2'>
     <div className='col-xs-12 col-md-8' style={{ paddingTop: 5 }}>
     اخترت يوم <b className='p-x-1'>{day ? days[day].dayName : ''}٫ {day ? days[day].dayDate : ''}</b> لاستلام الكتب
     </div>
     <div className='col-xs-12 col-md-4'>
     <button className='btn btn-white pull-xs-left' onClick={(): Function => setVisibility(true)}>
      تعديل الاختيار
     </button>
     </div>
     <div className='clearfix' />
    </div>
  } else {
  	data = <div className='my-panel-white shadow-1 m-t-3 m-b-3' style={{ overflow: 'hidden' }}>
          <header className='p-a-2'>
            اختر يوم الاستلام
          </header>
          <section style={{ backgroundColor: '#f7f8fa', borderTop: 'solid #dae0dd 1px' }}
            className='p-a-2'>
		{daysKeys.map((key: string): React.Element<'div'> => <div className='col-xs-12 col-md-3' key={key}>
		<div className={`my-panel-white shadow-1 text-xs-center ChooseDeliveryDay m-b-1
			 ${days[key].chosen && 'ChooseDeliveryDay__chosen'}
			 ${(days[key].remaining <= 0 && days[key].chosen <= 0) && 'ChooseDeliveryDay__disabled'}
			 `} style={{ overflow: 'hidden' }}>
		<h6 className='font-weight-bold p-t-2'>{days[key].dayName} ٫<span>{days[key].dayDate}</span></h6>
		{days[key].chosen !== 1 ? <div className='p-t-1 p-b-2 ChooseDeliveryDay__remaining' style={{ fontSize: 14 }}>
			{days[key].remaining > 0 ? `متاح ل ${days[key].remaining} حاليا` : `استنفذ الحد المسموح`}
		</div> : null }
		{days[key].chosen === 1 ? <div className='p-t-1 p-b-2 ChooseDeliveryDay__remaining' style={{ fontSize: 14 }}>
			&nbsp;
		</div> : null }
		{(days[key].remaining > 0 || days[key].chosen !== 0) ? <button
		  onClick={onSelect}
		  data-id={days[key].id}
		  disabled={days[key].remaining <= 0}
		  className=' btn-block btn btn-white ChooseDeliveryDay__btn' style={{ borderRadius: 0, borderWidth: 0, borderTopWidth: 1 }}>
			{days[key].chosen ? 'تم الاختيار' : 'اختيار'}
		</button> : null }
		</div>
		</div>)}
            <div className='clearfix' />
           <div className='text-xs-center'>
           	<button
           	  onClick={(): Function => setVisibility(false)}
           	  disabled={!hasChosenDay} className='btn btn-success p-x-3 m-y-2'>تأكيد الإختيار</button>
           </div>
          </section>
        </div>
  }
  return <div className='container'>
    <div className='row'>
      <div className='col-xs-12 col-md-10 col-md-pull-1'>
        {data}
      </div>
    </div>
  </div>
}
export default ChooseDeliveryDay
