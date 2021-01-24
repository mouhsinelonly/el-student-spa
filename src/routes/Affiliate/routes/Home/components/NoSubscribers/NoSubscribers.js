// @flow
import React from 'react'
import CodeBox from '../CodeBox'
import { useSelector } from 'react-redux'
import './NoSubscribers.scss'

type PropsType = {
  className: string
};

const NoSubscribers = (props: PropsType): React.Element<'div'> => {
  const { loading, data, query } = useSelector((state: Object): Object => state.affiliates.registrations)

  if (loading || (data !== null && data.total) || typeof query.nationality_country_id !== 'undefined') return null

  return (<div
    className={`${props.className} m-y-3 container`}>
    <div className='row'>
      <div className='col-xs-12'>
        <div className='Affiliate-NoSubscribers p-a-3 text-xs-center'>
          <h5 className='Affiliate-NoSubscribers__title'>مبارك عليك الانضمام</h5>
          <p className='Affiliate-NoSubscribers__desc p-y-2'>
            يمكنك البدأ بعمل حملاتك الإعلانية أو نشر رابطك، كما يمكنك تسجيل الطلبة مباشرة عبر زر <b>" تسجيل طالب جديد "</b>
          </p>
          <CodeBox light iconColor='#344142' />
        </div>
      </div>
    </div>
  </div>)
}
export default NoSubscribers
