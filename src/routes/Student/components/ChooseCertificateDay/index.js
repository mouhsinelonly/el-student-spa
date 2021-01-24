// @flow
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chooseDay } from 'routes/Student/modules/student'
import './ChooseCertificateDay.scss'

const inlineStyle = { verticalAlign: 'middle', display: 'inline-block' }

type PropertiesType = {
  chosen: number
};

const ChooseCertificateDay = (): React.Element<'div'> => {
  const dispatch = useDispatch()

  const { certificateDays: days } = useSelector((state: Object): Object => state.student)
  const daysKeys = Object.keys(days || {})

  const chosen = daysKeys.some((dayKey) => days[dayKey].chosen === 1)
  const [ visible, setVisibility ] = useState(!chosen)

  useEffect((): Function => {
    // dispatch(getCertificateDays())
  }, [])

  const onSelect = (event: Object) => {
    dispatch(chooseDay({ dayId: event.currentTarget.dataset.id }))
  }

  const hasChosenDay = daysKeys.reduce((chosen, next) => chosen + days[next].chosen, 0)
  let data = null

  if (daysKeys.length <= 0) {
    return null
  }
  const certId = days[daysKeys[0]].certId

  const location = <div>
    موقع الاستلام : <b>كلية العلوم الشرعية</b>
  </div>
  // const location = <div>
  //   <h6 className='MarketOrders__heading2 m-t-1'>موقع الاستلام : مبنى تابع للمركز بالعذيبة الجنوبية</h6>
  //   <a href="https://www.google.com/maps/place/23%C2%B035'05.4%22N+58%C2%B022'11.7%22E/@23.5848438,58.367717,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d23.5848438!4d58.3699057?hl=en-OM"
  //     target='_blank' rel='noopener noreferrer'
  //     style={{ fontSize: 12, backgroundColor: '#fff' }} className='m-t-1 btn-bluelight-outline btn'>
  //     <i style={inlineStyle} className='material-icons'>location_on</i> موقع المبنى على الخريطة
  //   </a>
  //   <a href='https://admin.el-css.edu.om/uploads/Modules/FileManager/Entities/FileManagerFile/files/000/000/065/original/building.jpeg'
  //     target='_blank' rel='noopener noreferrer'
  //     style={{ fontSize: 12, backgroundColor: '#fff' }} className='m-t-1 btn-bluelight-outline btn m-r-1'>
  //     <i style={inlineStyle} className='material-icons'>photo</i> صورة المبنى
  //   </a>
  // </div>
  if (!visible) {
  	const day = daysKeys.find((dayKey: string): boolean => days[dayKey].chosen === 1)
    data = <div className='my-panel-white shadow-1 m-t-3 m-b-3 p-a-1'>
      <div className='col-xs-12 col-md-10' style={{ paddingTop: 5 }}>
        اخترت يوم <b className='p-x-1'>{day ? days[day].dayName : ''}٫ {day ? `${days[day].dayDate} من س ${days[day].dayTime} إلى س ${days[day].toTime}` : ''}</b> لاستلام الشهادة
      </div>
      <div className='col-xs-12 col-md-2'>
        <button className='btn btn-white pull-xs-left' onClick={(): Function => setVisibility(true)}>
          تعديل الاختيار
        </button>
      </div>
      <div className='clearfix' />
      <div className='col-xs-12 p-b-2 p-t-1'>
        الرقم التسلسلي لشهادتك : <span className='text-success font-weight-bold' style={{ fontSize: 18 }}>{certId}</span>
      </div>
      <div className='col-xs-12 col-md-6'>
        <a href='https://admin.el-css.edu.om/uploads/Modules/FileManager/Entities/FileManagerFile/files/000/000/072/original/%D8%AE%D8%B7%D9%88%D8%A7%D8%AA%20%D8%A7%D8%B3%D8%AA%D9%84%D8%A7%D9%85%20%D8%A7%D9%84%D8%B4%D9%87%D8%A7%D8%AF%D8%A9.pdf' target='_blank' className='btn btn-white-outline'>تعليمات استلام الشهادة</a>
      </div>
      <div className='col-xs-12 col-md-6'>
        {location}
      </div>
      <div className='clearfix' />
    </div>
  } else {
  	data = <div className='my-panel-white shadow-1 m-t-3 m-b-3' style={{ overflow: 'hidden' }}>
    <div className='p-a-2'>
      <header className='col-xs-12 col-md-6 p-b-1'>
        اختر يوم استلام الشهادة
      </header>
      <div className='col-xs-12 col-md-6 p-b-1'>
        الرقم التسلسلي لشهادتك : <b>{certId}</b>
      </div>
      <div className='col-xs-12 col-md-6'>
        <a href='https://admin.el-css.edu.om/uploads/Modules/FileManager/Entities/FileManagerFile/files/000/000/072/original/%D8%AE%D8%B7%D9%88%D8%A7%D8%AA%20%D8%A7%D8%B3%D8%AA%D9%84%D8%A7%D9%85%20%D8%A7%D9%84%D8%B4%D9%87%D8%A7%D8%AF%D8%A9.pdf' target='_blank' className='btn btn-white-outline'>تعليمات استلام الشهادة</a>
      </div>
      <div className='col-md-6 col-xs-12'>
        {location}
      </div>
      <div className='clearfix' />
    </div>

    <section style={{ backgroundColor: '#f7f8fa', borderTop: 'solid #dae0dd 1px' }}
      className='p-a-2'>
      {daysKeys.map((key: string): React.Element<'div'> => <div className='col-xs-12 col-md-4' key={key}>
        <div className={`my-panel-white shadow-1 text-xs-center ChooseCertificateDay m-b-1
			 ${days[key].chosen && 'ChooseCertificateDay__chosen'}
			 ${(days[key].remaining <= 0 && days[key].chosen <= 0) && 'ChooseCertificateDay__disabled'}
			 `} style={{ overflow: 'hidden' }}>
          <h6 className='font-weight-bold p-t-2'>{days[key].dayName} <span>{days[key].dayDate}</span></h6>
          <h7 style={{ fontSize: 15 }} className='text-danger font-weight-bold'>من {days[key].dayTime} إلى {days[key].toTime}</h7>
          {days[key].chosen !== 1 ? <div className='p-t-1 p-b-2 ChooseCertificateDay__remaining' style={{ fontSize: 14 }}>
            {days[key].remaining > 0 ? `متاح ل ${days[key].remaining} حاليا` : `استنفذ الحد المسموح`}
          </div> : null }
          {days[key].chosen === 1 ? <div className='p-t-1 p-b-2 ChooseCertificateDay__remaining' style={{ fontSize: 14 }}>
			&nbsp;
          </div> : null }
          {(days[key].remaining > 0 || days[key].chosen !== 0) ? <button
            onClick={onSelect}
            data-id={days[key].id}
            disabled={days[key].remaining <= 0}
            className=' btn-block btn btn-white ChooseCertificateDay__btn' style={{ borderRadius: 0, borderWidth: 0, borderTopWidth: 1 }}>
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
export default ChooseCertificateDay
