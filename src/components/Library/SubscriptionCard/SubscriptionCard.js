// @flow
import * as React from 'react'
import './SubscriptionCard.scss'

type PropsType = {};

const SubscriptionCard = (props: PropsType): React.Element<'div'> => {
  // console.log(props)
  return (
    <div className='my-panel-white p-a-2 text-xs-center SubscriptionCard'>
      <h5 className='font-weight-bold text-purple SubscriptionCard__title'>خطة 6 أشهر</h5>
      <span className='SubscriptionCard__desc'>من بداية 14 سبتمبر ٢٠١٨ و تنتهي ١٤ فبراير ٢٠١٨</span>
    </div>
  )
}

export default SubscriptionCard
