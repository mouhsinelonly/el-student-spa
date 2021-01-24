// @flow
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShipMethod } from 'routes/Student/modules/market'

const pickup = {
  id: 1,
  title: 'من مبنى تابع للمركز بالعذيبة الجنوبية',
  location: "https://www.google.com/maps/place/23%C2%B035'05.4%22N+58%C2%B022'11.7%22E/@23.5848438,58.367717,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d23.5848438!4d58.3699057?hl=en-OM",
  enabled: true
}

const PickupBlock = (): React.Element<'button'> => {
  const dispatch = useDispatch()
  const { shipMethod } = useSelector((state: Object): Object => state.market)
  const handleShipMethod = (event: Object) => {
    const selectedId = +event.currentTarget.dataset.id
    const id = [1, 2].includes(selectedId) ? selectedId : 1
    dispatch(setShipMethod({ id }))
  }
  return <button
    data-id={pickup.id}
    onClick={handleShipMethod}
    type='button'
    key={pickup.id}
    className={`${shipMethod === pickup.id ? 'is-active' : ''} text-xs-right
btn-block m-t-1 MarketCart__delivery is-pickup ${!pickup.enabled ? 'is-disabled' : ''}`}>
    {pickup.title}
    <a href={pickup.location} target='_blank'
      rel='noreferrer noopener'
      style={{ position: 'relative', top: -2, color: '#009ee0', textDecoration: 'underline' }}
      className='pull-xs-left'>
      موقع المبنى
    </a>
  </button>
}
export default PickupBlock
