// @flow
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteOrder } from 'modules/market'
const getStatus = (status: string): Object => ({
  'waiting': 'في انتظار الدفع',
  'processing': 'قيد المعالجة',
  'packaging': 'التجهيز للشحن',
  'shipped': 'تم الشحن',
  'ready': 'جاهز للاستلام',
  'canceled': 'تم الغاءه',
  'student_canceled': 'تم الغاءه',
  'received': 'تم التسليم'
})[status]

type PropertiesType = {
  id: number,
  status: string,
  code: string,
  createdAt: string,
  amount: number,
  cityName: string,
  stateName: string,
  items: Array<Object>,
  ship: boolean
};

const inlineStyle = { verticalAlign: 'middle', display: 'inline-block' }

const MarketOrder = ({ id, status, code, createdAt, amount, cityName, stateName, ship, items }: PropertiesType) => {
  const dispatch = useDispatch()
  const onDeleteClick = () => {
    dispatch(deleteOrder({ id }))
  }
  return <div className='col-xs-12' key={id}>
    <div className='my-panel-white shadow-1 m-b-2 MarketOrders__item'>
      <header className='p-a-1 row'>
        {status !== 'canceled' ? <div className='col-xs-12 col-md-3 MarketOrders__heading2'>
          <h6 className='MarketOrders__heading'>رقم الطلب</h6> <b style={{ fontSize: 20 }}>{ code }</b>
        </div> : null}
        <div className='col-xs-12 col-md-2 MarketOrders__heading2'>
          <h6 className='MarketOrders__heading'>تاريخ الطلب</h6> { createdAt }
        </div>
        <div className='col-xs-12 col-md-2 MarketOrders__heading2'>
          <h6 className='MarketOrders__heading'>المجموع الكلي</h6> { amount }
        </div>
        <div className='col-xs-12 col-md-2'>
          <h6 className='MarketOrders__heading'>حالة الطلب</h6> <span className={`MarketOrders__status is-${status}`}>
            {getStatus(status)}
          </span>
        </div>
        <div className='col-xs-12 col-md-3' />
      </header>
      <section className='p-y-2 MarketOrders__item-footer'>
        <div className='col-xs-12 col-md-5'>
          <h6 className='MarketOrders__heading'>الطلب</h6>
          <ul className='list-unstyled m-a-0 p-a-0'>
            {items.map((item: Object): Object => <li className='MarketOrders__heading2' key={item.id}>
              {item.total} x {item.subjectName}
            </li>)}
          </ul>
        </div>
        <div className='col-xs-12 col-md-7'>
          <h6 className='MarketOrders__heading'>وسيلة الاستلام :</h6>
          {ship ? <div className='MarketOrders__heading2'>
            الشركة : محيط الولاية للنقل والتجارة
          </div> : null }
          {ship ? <div className='MarketOrders__heading2 m-t-1'>
            الشحن : محافظة {cityName} ٫
            ولاية {stateName}
          </div> : <div>
            <h6 className='MarketOrders__heading2 m-t-1'>مبنى تابع للمركز بالعذيبة الجنوبية</h6>
            <a href="https://www.google.com/maps/place/23%C2%B035'05.4%22N+58%C2%B022'11.7%22E/@23.5848438,58.367717,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d23.5848438!4d58.3699057?hl=en-OM"
              target='_blank' rel='noopener noreferrer'
              style={{ fontSize: 12, backgroundColor: '#fff' }} className='m-t-1 btn-bluelight-outline btn'>
              <i style={inlineStyle} className='material-icons'>location_on</i> موقع المبنى على الخريطة
            </a>
            <a href='https://admin.el-css.edu.om/uploads/Modules/FileManager/Entities/FileManagerFile/files/000/000/065/original/building.jpeg'
              target='_blank' rel='noopener noreferrer'
              style={{ fontSize: 12, backgroundColor: '#fff' }} className='m-t-1 btn-bluelight-outline btn m-r-1'>
              <i style={inlineStyle} className='material-icons'>photo</i> صورة المبنى
            </a>
          </div>}

          {ship ? <div style={{ color: '#ef8508' }} className='MarketOrders__heading2 m-t-1'>
            <i style={{ fontSize: 16, display: 'inline-block', verticalAlign: 'middle' }}
              className='material-icons'>error</i> تكلفة الشحن تدفع عند الاستلام
          </div> : null }
        </div>
        <div className='clearfix' />
      </section>
      {status === 'waiting' ? <footer>
        <button onClick={onDeleteClick} className='btn btn-danger-outline pull-xs-left m-a-2'>إلغاء الطلب <i style={inlineStyle} className='material-icons'>delete</i></button>
      </footer> : null }
      <div className='clearfix' />
    </div>
  </div>
}

export default MarketOrder
