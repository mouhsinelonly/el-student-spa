// @flow
import React, { useCallback } from 'react'
import { getSingleRegistration } from 'routes/Affiliate/modules/affiliates'
import Whatsapp from 'components/Svg/Whatsapp'
import { useDispatch } from 'react-redux'
import PointerClick from 'components/Svg/PointerClick'
import Assignment from 'components/Svg/Assignment'
import './RegistrationRow.scss'
type PropsType = {
  fullname: string,
  odd: boolean,
  contact_mobile: string,
  natcountry: Object,
  natcity: Object,
  step: Object,
  id: number,
  created_date: string,
  created_hour: string,
  affiliates: Array<number>
};

const Step = (props: Object): React.Element<'div'> => {
  const isCurrent = ![props.is_canceled, props.enroll].includes(true)
  return <div className={`label label-danger Affiliate-RegistrationRow__step 
    ${isCurrent ? 'is-current' : 'is-done'}
    ${props.is_canceled ? 'is-canceled' : ''}
    ${props.enroll ? 'is-enroll' : ''}
    `}>
    <div className='Affiliate-RegistrationRow__order'>{props.order}</div>{props.name}
  </div>
}

const hasCode = (number: string): boolean => {
  return /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/.test(number)
}

const RegistrationRow = (props: PropsType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const _onClick = useCallback(() => {
    dispatch(getSingleRegistration(props.id))
  })
  const isManual = props.affiliates[0].AffiliateRegistration.registration_type === 'manual'
  return <div className={`Affiliate-RegistrationRow`}>
    <div className={`Affiliate-RegistrationRow__container p-a-2 ${props.odd && 'is-odd'}`}>
      <div className='col-xs-12 col-md-3 m-r-0 p-r-0 Affiliate-RegistrationRow__title-box'>
        {!isManual ? <PointerClick className='Affiliate-RegistrationRow__icon m-l-1' />
          : <Assignment className='Affiliate-RegistrationRow__icon m-l-1' /> }
        <h1 className='font-weight-bold Affiliate-RegistrationRow__title'>
          {props.fullname}
        </h1>
        <span className='Affiliate-RegistrationRow__dates'>{props.created_date} | {props.created_hour}</span>
      </div>
      <div className='col-xs-12 col-md-2'>
        <Step {...props.step} />
      </div>
      <div className='col-xs-12 col-md-2'>
        {props.natcountry ? props.natcountry.name : ''}
      </div>
      <div className='col-xs-12 col-md-2'>
        {props.natcity ? props.natcity.name : ''}
      </div>
      <div className='col-xs-12 col-md-2'>
        {props.natcountry ? <a target='_blank'
          className='Affiliate-RegistrationRow__mobile'
          href={`https://wa.me/${hasCode(props.contact_mobile) ? props.contact_mobile
            : `${props.natcountry.calling_code}${props.contact_mobile}`}`}>
          <Whatsapp className='Affiliate-RegistrationRow__icon' /> {hasCode(props.contact_mobile) ? props.contact_mobile
            : `+${props.natcountry.calling_code}${props.contact_mobile}`}
        </a> : null }
      </div>
      <div className='col-xs-12 col-md-1 m-l-0 p-l-0' onClick={_onClick}>
        المزيد <i className='material-icons Affiliate-RegistrationRow__icon' style={{ marginRight: 5 }}>more</i>
      </div>
      <div className='clearfix' />
    </div>
  </div>
}

export default RegistrationRow
