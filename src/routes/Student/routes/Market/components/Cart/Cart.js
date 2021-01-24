// @flow
import React, { useEffect, useState } from 'react'
import { setShipMethod, postOrder } from 'routes/Student/modules/market'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import './MarketCart.scss'
import ShipBlock from './ShipBlock'
import PickupBlock from './PickupBlock'

const Cart = ({ onPurchase = () => {}, onRemove = () => {}, toggle }: Object): React.Element<'div'> => {
  const dispatch = useDispatch()
  const [ ordered, setOrdered ] = useState(false)

  useEffect((): Function => {
    document.getElementById('root').style.overflow = 'hidden'
    return () => {
      document.getElementById('root').style.overflow = 'scroll'
    }
  }, [])
  const onPlus = (event: Object) => {
    const id = +event.currentTarget.dataset.id
    onPurchase({ ids: [id] })
  }

  const onMinus = (event: Object) => {
    const id = +event.currentTarget.dataset.id
    const all = +event.currentTarget.dataset.all
    onRemove({ id, all: all === 1 })
  }
  const onClear = (event: Object) => {
    onRemove({ all: true })
  }
  const handleShipMethod = (event: Object) => {
    const selectedId = +event.currentTarget.dataset.id
    const id = [1, 2].includes(selectedId) ? selectedId : 1
    dispatch(setShipMethod({ id }))
  }
  const handleOrder = (): Function => {
    dispatch(postOrder())
    setOrdered(true)
  }
  const { cartItems, shipMethod, cityId, stateId } = useSelector((state: Object): Object => state.market)
  const itemsKeys = Object.keys(cartItems)
  const shipAmount = 0 // itemsKeys.reduce((amount: number, item: Object): number => amount + cartItems[item].shipAmount, 0)
  const amount = itemsKeys.reduce((amount: number, item: Object): number => amount + cartItems[item].amount, 0)
  return [!ordered ? <div key='cart' className='MarketCart my-panel-white shadow-3'>
    <div className='MarketCart__body' onClick={(event) => event.stopPropagation()}>
      <h5 className='MarketCart__title font-weight-bold p-a-1'>
        عربة التسوق ({itemsKeys.reduce((total: number, item: Object): number => total + cartItems[item].total, 0)})
        <button type='button' className='MarketCart__close' onClick={toggle}>
          <i className='material-icons'>close</i>
        </button>
      </h5>
      <div className='row MarketCart__table-head m-x-0'>
        <div className='col-xs-6'>الكتب</div>
        <div className='col-xs-4'>العدد</div>
        <div className='col-xs-2'>المبلغ</div>
      </div>
      <div className='MarketCart__table'>
        {itemsKeys.map((key: string): React.Element<'div'> => {
          const item = cartItems[key]
          return <div className='row MarketCart__table-item m-x-0' key={item.id}>
            <div className='col-xs-6 p-y-1 MarketCart__table-item-img'>
              <img src={item.photoUrl} alt={item.name} width='30' height='44' style={{ borderRadius: 2 }} />
              <div className='MarketCart__table-item-title '>
                <div className='text-truncate'>{item.name}</div>
                <button onClick={onMinus}
                  data-all='1'
                  data-id={item.subjectId}
                  className='MarketCart__table-item-delete' type='button'>حذف</button>
              </div>
            </div>
            <div className='col-xs-4'>
              <div className='input-group m-t-1' style={{ width:40 }}>
                <span data-id={item.subjectId}
                  onClick={onMinus}
                  className={`MarketCart__minus input-group-addon ${item.total < 2 ? 'is-disabled' : ''}`}>-</span>
                <input type='text' readOnly className='form-control text-xs-center MarketCart__total'
                  style={{ width: 22, padding: 0 }} value={item.total} />
                <span className='MarketCart__plus input-group-addon' data-id={item.subjectId} onClick={onPlus}>+</span>
              </div>
            </div>
            <div className='col-xs-2 MarketCart__amount'>{item.amount}</div>
          </div>
        })}
      </div>
      <div className='clearfix' />
      <div className='MarketCart__table-shadow' />
      <div className='MarketCart__subtotal p-y-2'>
        <div className='col-xs-6'>
          <h6 className='MarketCart__subtotal-title'>المجموع الفرعي</h6>
        </div>
        <div className='col-xs-6 text-xs-left font-weight-bold'>
          {amount} ريال عماني
        </div>
        <div className='clearfix' />
        <div className='p-x-1'>
          <h6 className='p-y-1'>خيارات الاستلام</h6>
          <PickupBlock />
          <ShipBlock amount={shipAmount} />
          <div className='clearfix' />
        </div>
      </div>
      <div className='MarketCart__fulltotal p-y-2'>
        <div className='col-xs-6'>
          <h6 className='MarketCart__fulltotal-title'>المجموع الكلي</h6>
        </div>
        <div className='col-xs-6 font-weight-bold text-xs-left'>
          {amount + (shipMethod !== 1 ? shipAmount : 0)} ريال عماني
        </div>
        <div className='clearfix' />
      </div>
      <div style={{ display: 'flex' }} className='p-a-1'>
        <button disabled={itemsKeys.length <= 0} onClick={onClear}
          type='button'
          className='btn btn-gray p-a-1 m-l-1 p-x-2' style={{ flexShrink:0 }}>
          تفريغ السلة
        </button>
        <button disabled={itemsKeys.length <= 0 || (shipMethod === 2 && (!stateId || !cityId))} onClick={handleOrder}
          type='button'
          className='btn btn-success p-a-1'
          style={{ flexGrow: 1 }}>
          تأكيد الحجز
        </button>
      </div>
    </div>
  </div> : <div key='cart' className='MarketCart my-panel-white shadow-3'>
    <div className='MarketCart__body'
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={(event: Object): Function => event.stopPropagation()}>
      <div className=' text-xs-center'>
        <h3>تم تأكيد طلبك</h3>
        <Link className='btn btn-success btn-lg m-t-1' to='/student/market/orders'>الذهاب لطلباتي</Link>
      </div>
    </div>
  </div>,
    <div className='MarketCart__shadow' key='shadow' onClick={toggle} />]
}

export default Cart
