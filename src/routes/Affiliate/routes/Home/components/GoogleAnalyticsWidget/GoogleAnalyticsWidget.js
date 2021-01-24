// @flow
import React, { useState } from 'react'
import './GoogleAnalyticsWidget.scss'
import { Link } from 'react-router'
import GoogleAnalytics from 'components/Svg/GoogleAnalytics'

const GoogleAnalyticsWidget = (props: PropsType): React.Element<'div'> => {
  const [visible, hide] = useState(false)
  if (visible) return null
  return (<div>
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1'>
          <div className='Affiliate-GoogleAnalyticsWidget m-t-2'>
            <div className='col-xs-12 col-md-3 col-lg-2'>
              <GoogleAnalytics />
            </div>
            <div className='col-xs-12 col-md-7 col-lg-7'>
              <h1 className='Affiliate-GoogleAnalyticsWidget__title'>إضافة إحصائيات google analytics</h1>
              <p className='Affiliate-GoogleAnalyticsWidget__desc p-a-0 m-a-0'>
  إذا كنت بحاجة لإحصائيات أكثر حول زوار رابطك، يمكنك إضافة رمز خدمة google analytics الخاصة بحسابك
  عبر الدخول لصفحة <Link to='/affiliate/settings' className='Affiliate-GoogleAnalyticsWidget__underline'>إعدادات الحساب</Link> ثم النقر على  <span className='Affiliate-GoogleAnalyticsWidget__underline'>إعدادات الإحصائيات</span>
              </p>
            </div>
            <button onClick={hide} className='Affiliate-GoogleAnalyticsWidget__cancel'>
              <i className='material-icons'>cancel</i>
            </button>
            <div className='clearfix' />
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default GoogleAnalyticsWidget
