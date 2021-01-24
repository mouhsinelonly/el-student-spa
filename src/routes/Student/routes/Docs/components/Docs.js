// @flow
import React, { useEffect, useCallback } from 'react'
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import Loading from 'components/Loading'
import StatementsRequests from './StatementsRequests'
import { getDocuments } from 'routes/Student/modules/documents'
import { getStatementOrders, toggleStatementNotification } from 'routes/Student/modules/orders'
import { getFiles } from 'routes/Student/modules/registrations'

const Docs = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { statemNotifEnabled } = useSelector((state: Object): Object => state.orders)
  const { loading, data: documents } = useSelector((state: Object): Object => state.documents)
  const { token } = useSelector((state: Object): Object => state.auth)
  useEffect(() => {
    dispatch(getDocuments())
    dispatch(getStatementOrders())
    dispatch(getFiles())
  }, [])
  const _hideNotification = useCallback(() => {
    dispatch(toggleStatementNotification(false))
  }, [])
  if (statemNotifEnabled) {
    return <div className='container m-t-3'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
          <h2 className='text-xs-center font-weight-bold p-y-3'>تم تقديم طلبك</h2>
          <div className='my-panel-white shadow-1 m-t-3 p-a-3'>
            <h4 className='text-xs-center'>تنبيهات مهمة</h4>
            <ul className='m-y-2 p-student-docs__list' style={{ color: '#777d84' }}>
              <li className='p-y-1' >تم استقبال طلبك وسيتم تجهيزه تقريبا في غضون
                <span className='text-warning font-weight-bold p-r-1'>3 أسابيع</span></li>
              <li className='p-y-1'>سيتم ابلاغك عن طريق رسالة SMS</li>
              <li className='p-y-1'>يرجى عدم مراجعة الكلية، قبل التوصل برسالة تجهيز الافادة</li>
            </ul>
            <div className='text-xs-center'>
              <button className='btn btn-success'
                onClick={_hideNotification} style={{ padding: '10px 80px' }}>حسنا</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  return (<div className='p-student-docs__container'>
    <h1 className='p-student-docs__heading text-xs-center'>الخطابات</h1>
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'
          style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className='col-xs-12 p-l-0-xs p-r-0-xs'>
            <StatementsRequests />
          </div>
          {!loading ? documents.map((d: Object, i: number): React.Element<typeof DocItem> =>
            <DocItem {...d} key={i} token={token} />) : <div className='p-y-3'><Loading /></div> }
        </div>
      </div>
    </div>
  </div>)
}

type DocType = {
  title: string,
  description: string,
  token: string,
  url: string
};

const DocItem = (props: DocType): React.Element<'div'> => (<div className='col-xs-12 col-md-4 text-xs-center
  p-r-0-xs p-l-0-xs'>
  <div className='p-a-2 p-student-docs__documents__item shadow-1 m-b-2'>
    <h1 className='p-student-docs__documents__item-title'>{props.title}</h1>
    <p className='p-student-docs__documents__item-content'>
      {props.description}
    </p>
    <a href={`${props.url}?token=${props.token}`}
      target='_blank'
      className='p-student-docs__documents__item-download btn btn-gray p-x-3'>
      تحميل
    </a>
  </div>
</div>)

export default Docs
