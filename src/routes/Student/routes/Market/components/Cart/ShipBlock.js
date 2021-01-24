// @flow
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStates, setState, setMobile, setShipMethod } from 'routes/Student/modules/market'
import './MarketShipBlock.scss'

const item = {
  id: 2,
  title: 'استلام عن طريق الشحن',
  enabled: true
}

const ShipBlock = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { cities, states, stateId, cityId, mobile, shipMethod } = useSelector((state: Object): Object => state.market)
  const active = shipMethod === 2
  const handleShipMethod = (event: Object) => {
    const selectedId = +event.currentTarget.dataset.id
    const id = [1, 2].includes(selectedId) ? selectedId : 1
    dispatch(setShipMethod({ id }))
  }
  const { profile: { mobile: initialMobile } } = useSelector((state: Object): Object => state.student)
  useEffect(() => {
    dispatch(setMobile(initialMobile))
  }, [])
  const handleChangeCity = (event: Object) => {
    dispatch(getStates({ cityId: +event.currentTarget.value }))
  }
  const handleChangeState = (event: Object) => {
    dispatch(setState({ stateId: +event.currentTarget.value }))
  }
  const handleMobileChange = (event: Object) => {
    dispatch(setMobile(event.currentTarget.value))
  }

  return <fieldset
    className={`MarketShipBlock is-shipping p-t-2 MarketCart__delivery ${active ? 'is-active' : ''} m-t-1`}>
    <button data-id={item.id} onClick={handleShipMethod} type='button'
      className={`
              text-xs-right
              MarketCart__delivery-btn
              btn-block ${!item.enabled && 'is-disabled'}`}>
      {item.title} <b className='p-r-3'>3-7 أيام</b>
      <div className='pull-xs-left p-l-1' style={{ fontSize: 16 }}>2ريال</div>
    </button>
    <hr className='m-b-0' />
    <div className='p-x-1'>
      <h6 className='p-a-0 MarketShipBlock__header'>عنوان الشحن</h6>
      <div className='MarketShipBlock__adress'>
        <select disabled={!active} value={cityId || 0}
          onChange={handleChangeCity}
          className={`MarketShipBlock__adress-item ${!cityId && active && 'has-danger'}`} placeholder='المحافظة'>
          <option>المحافظة</option>
          {cities.map((city: Object): React.Element<'option'> => <option key={city.value} value={city.value}>{city.text}</option>)}
        </select>
        <select disabled={!active} value={stateId || 0}
          onChange={handleChangeState}
          className={`MarketShipBlock__adress-item ${!stateId && active && 'has-danger'}`} placeholder='الولاية'>
          <option>الولاية</option>
          {states.map((state: Object): React.Element<'option'> => <option key={state.value} value={state.value}>{state.text}</option>)}
        </select>
        <input onKeyUp={handleMobileChange}
          disabled={!active}
          type='text'
          className='form-control m-t-1'
          defaultValue={mobile}
          name='mobile'
          style={{ flexBasis: 'auto' }} />
      </div>
    </div>
    <div className='text-xs-center m-t-1' style={{ backgroundColor: '#fff5c7', padding: '8px 0', color: '#ef8508', borderTop: '#e0d0bc solid 1px' }} >
      <i style={{ fontSize: 16, display: 'inline-block', verticalAlign: 'middle' }}
        className='material-icons'>error</i> يبنغي عليك دفع تكلفة الشحن (2ريال) لشركة الشحن عند الاستلام
    </div>
  </fieldset>
}

export default ShipBlock
