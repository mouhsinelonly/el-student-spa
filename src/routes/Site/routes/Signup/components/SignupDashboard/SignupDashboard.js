// @flow
import React, { useEffect, useMemo, useCallback, useState } from 'react'
// import css
import './SignupDashboard.scss'
import { Translate } from 'react-localize-redux'
// import components
import Loading from 'components/Loading'
import Requirements from 'components/Registration/Requirements'
import SpecialtyTabs from 'routes/Site/components/SpecialtyTabs'
import { SpecialtiesOptions } from 'utils'
import MasterRequirements from 'components/Registration/MasterRequirements'
import SpecialtyBlock from '../SpecialtyBlock'
import { useDispatch } from 'react-redux'
import NonOmaniRules from '../NonOmaniRules'
import { getSpecialities, showSignupRequirements, hideSinupRequirements } from '../../modules/specialities'
import { getRegistrationPeriod } from 'modules/registration_period'
import { getCountries } from 'modules/countries'
import { logout } from 'routes/Auth/modules/auth'

type PropsType = {
  isShowingRequirements: boolean,
  activeSpecialty: string,
  token: string,
  specialities: Array<Object>,
  loading: boolean,
  periods: Array<Object>
};

const SignupDashboard = (props: PropsType): React.Element<'div'> => {
  const { specialities, loading, isShowingRequirements, activeSpecialty, token, periods } = props
  const [nonOmaniVisible, setNonOmaniVisibility] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      dispatch(logout())
    }
    dispatch(getCountries())
    dispatch(getSpecialities())
    dispatch(getRegistrationPeriod())
  }, [])
  const renderSpecialties = useMemo((): Array<*> => {
    const period = typeof periods !== 'undefined'
    ? periods.find((p: Object): boolean => p.degree_type === activeSpecialty)
    : null

    return specialities.filter((s: Object): boolean => (s.type === activeSpecialty) ||
      (s.type === 'dep' && activeSpecialty === 'bac'))
    .map((specialty: Object, index: number): React.Element<'div'> =>
      <div key={index} className='col-xs-12 col-md-4'>
        <SpecialtyBlock
          canregister={period && typeof period.id !== 'undefined' &&
          (period.degree_type === specialty.type || (period.degree_type === 'bac' && specialty.type === 'dep'))}
          index={index + 1} {...specialty} />
      </div>)
  })
  const toggleNonOmani = useCallback(() => {
    dispatch(hideSinupRequirements())
    setNonOmaniVisibility(!nonOmaniVisible)
  }, [nonOmaniVisible])
  const _toggleRequirements = useCallback(() => {
    setNonOmaniVisibility(false)
    isShowingRequirements ? dispatch(hideSinupRequirements()) : dispatch(showSignupRequirements())
  }, [isShowingRequirements])

  if (loading) return <div className='signup-page__loading'><Loading /></div>

  return (<div className='container text-xs-center p-t-2 signup-page__container'>
    <h1 className='signup-page__heading'>
      <Translate id='signup_page.choose_specialty' />
    </h1>
    <SpecialtyTabs options={SpecialtiesOptions} className='m-t-3 m-b-3' />
    <p className='hidden-xs-up'>
      <Translate id='signup_page.subheader' data={{ number: specialities.length }} />
    </p>
    <div className={`row signup-page__specialities`}>
      {renderSpecialties}
    </div>
    <div className='row'>
      <div className='col-xs-12 col-md-10 col-md-pull-1 text-xs-center'>
        <button onClick={_toggleRequirements}
          className={`signup-page__more-button btn btn-secondary-outline btn-curved m-x-1`}>
          <Translate id={isShowingRequirements ? `signup_page.hide_requirements` : 'signup_page.show_requirements'} />
          <i className='material-icons signup-page__plus m-r-1'>
            {!isShowingRequirements ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
          </i>
        </button>
        <button onClick={toggleNonOmani}
          className={`signup-page__more-button btn btn-secondary-outline btn-curved m-x-1`}>
          <Translate id='signup_page.steps_nonomani' />
          <i className='material-icons signup-page__plus m-r-1'>
            {!nonOmaniVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
          </i>
        </button>
      </div>
      <div className='col-xs-12 col-md-10 col-md-pull-1'>
        {isShowingRequirements && !nonOmaniVisible &&
          (activeSpecialty === 'bac' ? <Requirements /> : <MasterRequirements />)}
        {!isShowingRequirements && nonOmaniVisible && <NonOmaniRules /> }
      </div>
    </div>
  </div>
  )
}

export default SignupDashboard
