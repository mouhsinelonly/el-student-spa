// @flow
import React from 'react'
import SocialLinks from './SocialLinks'
import './Footer.scss'

const SupportInfo = (): React.Element<'div'> => (<div className='c-footer__address'>
  <ul className='col-xs-12 col-md-6 c-footer__address__list text-xs-right'>
    <li>سكة 2535، المها شارع</li>
    <li>الخوير 33 ، مسقط</li>
    <li>سلطنة عمان</li>
  </ul>
  <div className='col-xs-12 col-md-6 '>
    <ul className='c-footer__address__list hidden-xs-down p-a-0'>
      <li>80099777</li>
      <li>0096824393777</li>
      <li>info@css.edu.om</li>
    </ul>
    <SocialLinks />
  </div>
</div>)

export default SupportInfo
