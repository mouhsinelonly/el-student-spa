// @flow
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UserNavbar from 'components/UserNavbar'
import Search from './components/Search'
import DevicesList from './components/DevicesList'
import { getWaitingExamAppDevices } from 'routes/Users/modules/users'

const Activation = (): React.Node => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWaitingExamAppDevices())
  }, [])
  return (<div className='m-t-3'
    style={{ paddingTop: 67, backgroundColor: '#edf0f4', minHeight: '100%' }}>
    <UserNavbar />
    <Search />
    <DevicesList />
  </div>)
}
export default Activation
