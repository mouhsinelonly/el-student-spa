// @flow
import React, { useEffect } from 'react'
import { browserHistory } from 'react-router'
import useLocalStorage from 'hooks/useLocalStorage'
import { APIBASE, CONSTANTS } from 'utils'
import request from 'superagent'
import { useDispatch } from 'react-redux'
import { getRegistrationPeriod } from 'modules/registration_period'
type PropsType = {
  params: Object
};

const Visit = (props: PropsType): React.Element<'div'> => {
  const { params: { code } } = props
  const dispatch = useDispatch()
  const [ , setAffiliateCode ] = useLocalStorage(CONSTANTS['AFFILIATE_CODE_LOCAL_STORAGE_KEY'])
  useEffect(() => {
    setAffiliateCode(code.toUpperCase())
    if (code.toLowerCase() === 'm') {
      dispatch(getRegistrationPeriod('J3IDfON3wW'))
    }
    request.post(`${APIBASE}/api/affiliates/visit`)
    .send({ code: code.toUpperCase() })
    .end(() => {
      browserHistory.push('/programmes')
    })
  }, [])

  return <div />
}

export default Visit
