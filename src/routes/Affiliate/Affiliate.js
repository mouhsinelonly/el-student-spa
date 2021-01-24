// @flow
import React, { useEffect } from 'react'
import Landing from './Landing'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getStats, getSearchSteps } from 'routes/Affiliate/modules/affiliates'
import { getCountries } from 'modules/countries'

type PropsType = {};

const Referral = (props: PropsType): Array<React.Element<'div'>> => {
  const dispatch = useDispatch()
  const { isAffiliateAuthenticated } = useSelector((state: Object): Object => state.auth)

  useEffect((): Function => {
    if (isAffiliateAuthenticated) {
      dispatch(getStats())
      dispatch(getProfile())
      dispatch(getCountries())
      dispatch(getSearchSteps())
    }
  }, [])
  return props.children || <Landing key='landing' />
}

export default Referral
