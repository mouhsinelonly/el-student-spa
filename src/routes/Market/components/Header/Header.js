// @flow
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { isMobile } from 'utils'
import { showModal } from 'modules/modals'
import './Header.scss'

const Header = ({ toggle }: Object): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { cartItems, orders } = useSelector((state: Object): Object => state.market)
  const itemsKeys = Object.keys(cartItems)
  const onPlay = () => {
    dispatch(showModal('youtube', { youtubeId: 'IChEG2Fp3bw' }, true, true, isMobile() ? 'full' : 'medium'))
  }
  return <div className='shadow-1 p-y-2 MarketHeader'>
    <div className='container'>
      <div className='col-xs-10 col-xs-pull-1'>
        <div className='row'>
          <div className='col-xs-12 col-md-5 p-l-0'>
            <h4>
              <Link to='/eshop' className='MarketHeader__home'>
                <i className='material-icons'>store</i> المتجر
              </Link>
            </h4>
          </div>
          <div className='col-xs-12 col-md-2 m-b-1 m-t-1'>
            <Link to='/eshop/orders' className='btn btn-block btn-white-outline MarketHeader__btn'>
              <i className='material-icons MarketHeader__icon'>local_shipping</i> الطلبات
              <div className='MarketHeader__badge'>{orders.length}</div>
            </Link>
          </div>
          <div className='col-xs-12 col-md-3 m-t-1'>
            <button onClick={toggle} type='button'
              className='is-green btn-block btn btn-white-outline MarketHeader__btn'>
              <i className='material-icons MarketHeader__icon is-green'>shopping_basket</i> عربة التسوق
              <div className='MarketHeader__badge is-green'>
                {itemsKeys.reduce((total: number, item: Object): number => total + cartItems[item].total, 0)}
              </div>
            </button>
          </div>
          <div className='col-xs-12 col-md-2 p-l-0 m-t-1'>
            <button onClick={onPlay} type='button'
              className='btn-purple-outline btn-block btn MarketHeader__btn p-r-3'>
              <i className='material-icons MarketHeader__icon'>play_circle_filled</i> فيديو
            </button>
          </div>
          
        </div>
         <div className='col-xs-12 col-md-5 p-r-0'>
            <h4>
            <ul>
              </ul>
            </h4>
          </div>
      </div>
    </div>
    <div className='clearfix' />
  </div>
}

export default Header
