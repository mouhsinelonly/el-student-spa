// @flow
import React from 'react'
import './RegistrationRow.scss'
type PropsType = {
  className: string
};
const RegistrationRow = (props: PropsType): React.Element<'div'> =>
  <div className={`Placeholders-RegistrationRow ${props.className}`}>
    <div className='Placeholders-RegistrationRow__container'>
      <div className='Placeholders-RegistrationRow__icon' />
      <div className='Placeholders-RegistrationRow__white is-icon-top' />
      <div className='Placeholders-RegistrationRow__white is-icon-left' />
      <div className='Placeholders-RegistrationRow__white is-icon-right' />
      <div className='Placeholders-RegistrationRow__white is-icon-bottom' />
      <div className='Placeholders-RegistrationRow__white is-icon-left' />
      <div className='Placeholders-RegistrationRow__white is-fullbottom' />
      <div className='Placeholders-RegistrationRow__white is-fulltop' />
      <div className='Placeholders-RegistrationRow__white is-fullleft' />
      <div className='Placeholders-RegistrationRow__white is-namebottom' />
      <div className='Placeholders-RegistrationRow__white is-nameleft' />
      <div className='Placeholders-RegistrationRow__white is-datebottom' />
      <div className='Placeholders-RegistrationRow__white is-dateleft' />
      <div className='Placeholders-RegistrationRow__white is-stepleft' />
      <div className='Placeholders-RegistrationRow__white is-countryleft' />
      <div className='Placeholders-RegistrationRow__white is-cityleft' />
      <div className='Placeholders-RegistrationRow__white is-citytop' />
      <div className='Placeholders-RegistrationRow__white is-countrytop' />
      <div className='Placeholders-RegistrationRow__white is-numbertop' />
      <div className='Placeholders-RegistrationRow__white is-numberbottom' />
      <div className='Placeholders-RegistrationRow__white is-citybottom' />
      <div className='Placeholders-RegistrationRow__white is-countrybottom' />
      <div className='Placeholders-RegistrationRow__white is-whatsappleft' />
      <div className='Placeholders-RegistrationRow__white is-moretop' />
      <div className='Placeholders-RegistrationRow__white is-morebottom' />
    </div>
  </div>

export default RegistrationRow
