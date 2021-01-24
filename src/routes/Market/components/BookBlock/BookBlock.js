// @flow
import React, { useState, useEffect } from 'react'
import './BookBlock.scss'

type PropertiesType = {
  name: string,
  photoUrl: string,
  pageCount: string,
  color: string,
  id: number,
  inCart: number,
  onPurchase: Function,
  available: boolean,
  version: string
};

let timer = null

const BookBlock = ({
  photoUrl,
  name,
  pageCount,
  version,
  inCart,
  color,
  available,
  id,
  onPurchase = () => {} }: PropertiesType): React.Element<'div'> => {
  const onClick = () => {
    onPurchase({ ids: [id] })
  }

  useEffect((): Function => (): Function => {
    clearTimeout(timer)
  }, [])

  return <div className='text-xs-center MarketBookBlock shadow-1'>
    <div className='MarketBookBlock__cover' style={{ backgroundColor: color }}>
      <img src={photoUrl} alt={name} className={`${!photoUrl ? 'is-empty' : ''} mg-fluid MarketBookBlock__img`} />
    </div>
    <div className='MarketBookBlock__details p-y-1 p-x-1'>
      <h6 className='p-x-0 p-y-0 text-truncate'>{name}</h6>
      <div className='MarketBookBlock__details-extra font-helvetica'>
        {available ? <span>{pageCount} صفحة {version}</span> : null }
        {!available ? <span>سيتم توفيره السنة القادمة</span> : null }
      </div>
    </div>
  </div>
}

export default BookBlock
