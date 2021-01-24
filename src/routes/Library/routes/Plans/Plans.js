// @flow
import * as React from 'react'
import SubscriptionChooser from './Components/SubscriptionChooser'
import TrialChooser from './Components/TrialChooser'
import requireAuthentication from 'components/AuthenticatedComponent'
import './Plans.scss'
import leftBooks from 'static/img/library-s-hero-left.png'
import rightBooks from 'static/img/library-s-hero-right.png'

type PropsType = {};

const Plans = (props: PropsType): React.Element<'div'> => {
  return (
    <div className='p-lib-plans'>
      <div className='p-lib-plans__blur-bg' >
        <img src={leftBooks} alt='elcss' className='p-lib-plans__blur-bg__left' />
        <img src={rightBooks} alt='elcss' className='p-lib-plans__blur-bg__right' />
      </div>
      <div className='p-lib-plans__content'>
        <h4 className='p-y-3 text-xs-center p-lib-plans__title font-weight-bold'>اختر الخطة</h4>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-6 col-md-pull-3'>
              <SubscriptionChooser />
              <TrialChooser />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default requireAuthentication(Plans)
