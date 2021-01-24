// @flow
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { ChooseDeliveryDay } from '../../components'
import { toggleCartVisibility, getOrders } from 'modules/market'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'
import MarketOrder from './MarketOrder'
import ShippingInfo from './ShippingInfo'
import requireAuthentication from 'components/AuthenticatedComponent'

import './MarketOrders.scss'

const MarketOrders = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { orders, ordersLoading, daysLoading, days } = useSelector((state: Object): Object => state.market)
  useEffect((): Function => {
    dispatch(getOrders())
    dispatch(hideStudentNavbar())
    dispatch(toggleCartVisibility(false))
    return () => {
      dispatch(showStudentNavbar())
    }
  }, [])
  const hasShipOrders = orders.filter(order => order.ship === 1 && order.status !== 'received').length > 0
  const activeOrders = orders.filter(order => order.status !== 'received')
  const doneOrders = orders.filter(order => order.status === 'received')
  const hasChosenDay = Object.keys(days).reduce((chosen, next) => chosen + days[next].chosen, 0)
  const hasOrders = orders.findIndex((order: Object): boolean => !['waiting', 'received'].includes(order.status)) >= 0

  return <div>
    <div className='shadow-1 p-y-2 MarketHeader' style={{ position: 'sticky', top: 0, zIndex: 99 }}>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <Link to='/eshop/dashboard' className='MarketHeader is-orders'>
              <i className='material-icons'>arrow_forward</i>  الطلبات
            </Link>
          </div>
        </div>
      </div>
      <div className='clearfix' />
    </div>

    {hasShipOrders ? <ShippingInfo /> : null }
    {(!daysLoading || Object.keys(days).length > 0) && hasOrders ? <ChooseDeliveryDay chosen={hasChosenDay} key='day' /> : null}
    <div className='container p-b-3'>
      <div className='row p-t-3 p-b-3'>
        <div className='col-xs-12'>
          <h6 className='font-weight-bold p-b-2'>طلبات جارية ({activeOrders.length})</h6>
        </div>
        {activeOrders.map((order: Object): React.Element<'div'> => <MarketOrder key={order.id} {...order} />)}
        <div className='col-xs-12'>
          <h6 className='font-weight-bold p-b-2'>طلبات منتهية ({doneOrders.length})</h6>
        </div>
        {doneOrders.map((order: Object): React.Element<'div'> => <MarketOrder key={order.id} {...order} />)}
      </div>
    </div>
  </div>
}

export default requireAuthentication(MarketOrders)
