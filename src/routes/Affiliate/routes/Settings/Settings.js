// @flow
import React, { useMemo, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import UserNavbar from '../../components/UserNavbar'
import Tabs from './components/Tabs'
import { useSelector } from 'react-redux'
import BankTabContent from './components/BankTabContent'
import LoginTabContent from './components/LoginTabContent'
import AnalyticsTabContent from './components/AnalyticsTabContent'
import './Settings.scss'
import { updateProfile } from 'routes/Affiliate/modules/affiliates'

type PropsType = {};

const Settings = (props: PropsType): React.Element<'div'> => {
  const [activeTab, setActiveTab] = useState('login')
  const dispatch = useDispatch()
  const { data } = useSelector((state: Object): Object => state.affiliates.profile)
  const onSubmit = useCallback((values: Object) => {
    dispatch(updateProfile(values))
  })
  const tabContent = useMemo((): React.Element => {
    return ({
      'bank': <BankTabContent onSubmit={onSubmit} initialValues={{
        bank_country_id: !!data && data.bank_country_id,
        iban: !!data && data.iban,
        name: !!data && data.name,
        bank_name: !!data && data.bank_name
      }} />,
      'analytics': <AnalyticsTabContent onSubmit={onSubmit} initialValues={{ ga_id: !!data && data.ga_id }} />,
      'login':<LoginTabContent onSubmit={onSubmit} initialValues={{
        email: !!data && data.email,
        mobile: !!data && data.mobile
      }} />
    })[activeTab]
  }, [data, activeTab])
  return (<div className='Affiliate-Settings'>
    <UserNavbar key='nav' />
    <Tabs key='tabs' activeId={activeTab} onTabChange={setActiveTab} />
    <div className='container m-t-3 p-b-3'>
      <div className='row'>
        <div className='col-xs-12 col-md-6 col-lg-4 col-md-pull-3 col-lg-pull-4'>
          {tabContent}
        </div>
      </div>
    </div>
  </div>)
}

export default Settings
