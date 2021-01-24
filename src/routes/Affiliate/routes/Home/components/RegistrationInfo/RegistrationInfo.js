// @flow
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'components/Loading'
import RegistrationInfoBody from './RegistrationInfoBody'
import useKeyPress from 'hooks/useKeyPress'
import { setActiveRegistration } from 'routes/Affiliate/modules/affiliates'
import './RegistrationInfo.scss'

type PropsType = {};

const RegistrationInfo = (props: PropsType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { activeFullRegistration } = useSelector((state: Object): Object => state.affiliates)
  const _onClose = useCallback(() => {
    dispatch(setActiveRegistration(null))
  })
  useKeyPress('Escape', _onClose)
  return (<div className={`Affiliate-RegistrationInfo ${!activeFullRegistration && 'is-hidden'}`}>
    <div className='Affiliate-RegistrationInfo__backdrop' onClick={_onClose} />
    <div className='Affiliate-RegistrationInfo__content p-a-3'>
      <h6 className='font-weight-bold'>معلومات الطالب</h6>
      <button onClick={_onClose} className='Affiliate-RegistrationInfo__cancel '>
        <i className='material-icons'>cancel</i>
      </button>
      { activeFullRegistration ? <RegistrationInfoBody {...activeFullRegistration} /> : <Loading /> }
    </div>
  </div>)
}

export default RegistrationInfo
