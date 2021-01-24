// @flow
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
type PropsType = {
  items: Array<Object>
};

const getStatus = (status: string): Object => ({
  'waiting': 'في انتظار الدفع',
  'processing': 'قيد المعالجة',
  'packaging': 'التجهيز للشحن',
  'shipped': 'تم الشحن',
  'ready': 'جاهز للاستلام',
  'received': 'تم التسليم'
})[status]

const inlineStyle = { display:'inline-block', verticalAlign: 'middle' }

const StudentMarket = (Properties: PropsType): React.Element<'div'> => {
  const [ordersVisible, setOrdersVisiblity] = useState(false)
  const { activeStudentCart: items, activeStudentOrders: orders } =
  useSelector((state: Object): Object => state.user_market)
  const total = Object.keys(items).reduce((all: number, nextKey: string): number => all + items[nextKey].amount, 0)

  return (
    <div className='v2-ticket-student-tilawa p-b-2'>
      <h1 className='v2-ticket-student-tilawa__title is-active p-y-2 p-x-2'>سلة المتجر ({total} ريال عماني)</h1>
      <ul>
        {Object.keys(items).map((key: string): React.Element<'li'> =>
          <li className='text-truncate' key={items[key].subjectId}>
            {items[key].total} x {items[key].name}
          </li>)}
      </ul>
      <button onClick={(): Function => setOrdersVisiblity(!ordersVisible)}
        className='v2-ticket-student-tilawa__title is-active p-x-2 text-xs-right'
        style={{ backgroundColor: 'transparent', borderWidth: 0, width: '100%' }}>
        طلبات المتجر المؤكدة ({Object.keys(orders).length})<div className='material-icons'
          style={inlineStyle}>{ordersVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</div>
      </button>
        {ordersVisible && orders ? Object.keys(orders).map((key: string): React.Element<'div'> =>
          <div className='p-x-2 text-truncate' key={orders[key].id}>
            <div style={{ padding: 5, borderBottom: 'solid #ced1d7 1px' }}>
              <b>الطلب :</b> <span dir='ltr'>{orders[key].code}</span>
              <span className='label label-info p-x-1 m-r-1' style={inlineStyle}>
                {getStatus(orders[key].status)}
              </span>
              <b className='pull-xs-left' style={{ color: !orders[key].transactionId ? 'red' : 'green' }}>
                {orders[key].amount} ريال
              </b>
            </div>
            <ul className='list-unstyled m-x-0 p-a-1 m-b-2'
              style={{ backgroundColor: '#ecf0f6', borderRadius: '0 0 5px 5px' }}>
            {orders[key].items ? orders[key].items.map((item: Object): React.Element<'li'> => <li className='text-truncate' key={item.id}>
              {item.total} x {item.subjectName}
              </li>) : null}
            </ul>
          </div>) : null}
      <div className='clearfix' />
    </div>
  )
}

export default StudentMarket
