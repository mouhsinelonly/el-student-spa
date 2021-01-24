// @flow
import React from 'react'
import UserNavbar from '../../components/UserNavbar'
import { useSelector } from 'react-redux'
import PasswordChange from './components/PasswordChange'
import Dashboard from './components/Dashboard'
import Loading from 'components/Loading'
import './Home.scss'
import requireAuthentication from 'components/AuthenticatedComponent'

type PropsType = {};

const Home = (props: PropsType): React.Element<'div'> => {
  const { loading } = useSelector((state: Object): Object => state.affiliates.profile)

  return (<div className='Affiliate-Home'>
    <UserNavbar />
    { loading ? <Loading centered /> : <Dashboard /> }
    <PasswordChange />
  </div>)
}

export default requireAuthentication(Home, 'affiliates')
