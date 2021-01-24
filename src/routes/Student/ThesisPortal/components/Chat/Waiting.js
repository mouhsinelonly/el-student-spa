// @flow
import React from 'react'
import SandClock from 'components/Svg/SandClock'
const Waiting = (): React.Element<'div'> => <div className='p-a-3 font-helvetica text-xs-center'
  style={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: '#777d84' }}>
  <div>
    <SandClock />
    <h4 className='font-weight-bold m-t-2'>المراسلة</h4>
    <p style={{ fontSize: '14px', lineHeight: 2 }}>بعد الموافقة على المشرف يمكنك التواصل معه من خلال هذه النافذة</p>
  </div>
</div>

export default Waiting
