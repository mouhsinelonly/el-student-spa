// @flow
import React, { useEffect } from 'react'
import Market from './Market'
import { useDispatch, useSelector } from 'react-redux'
import { Cart } from './components'
import { toggleModalVisibility } from 'modules/modals'
import { toggleCartVisibility, addToCart, removeFromCart, getCities } from 'routes/Student/modules/market'
type PropertiesType = {
  children: React.Element
};

const MarketDashboard = ({ children }: PropertiesType) => {
  const dispatch = useDispatch()
  useEffect((): Function => {
    dispatch(getCities())

    dispatch(toggleModalVisibility(false))
    return () => {
      dispatch(toggleModalVisibility(true))
    }
  }, [])
  const { cartVisible } = useSelector((state: Object): Object => state.market)
  const onPurchase = ({ ids }: Object): Function => dispatch(addToCart({ ids }))
  const onRemove = ({ id, all = false }: Object): Function => dispatch(removeFromCart({ id, all }))
  const toggleCart = () => {
    dispatch(toggleCartVisibility())
  }
  return <>
  {children || <Market key='market' toggleCart={toggleCart} onPurchase={onPurchase} />}
  {cartVisible ? <Cart toggle={toggleCart} key='cart' onPurchase={onPurchase} onRemove={onRemove} /> : <span key='cartempty' /> }
</>
}
export default MarketDashboard
