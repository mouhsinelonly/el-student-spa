// @flow
import React from 'react'
import DashboardStatistics from '../DashboardStatistics'
import GoogleAnalyticsWidget from '../GoogleAnalyticsWidget'
import './Dashboard.scss'
import NoSubscribers from '../NoSubscribers'
import Registrations from '../Registrations'
import SearchBar from '../SearchBar'

type PropsType = {};

const statistics = [
  {
    id: 1,
    title: 'زيارات اليوم',
    value: 18,
    hint: 'arrow_drop_up',
    minus: 0,
    color: '#b9c2cb'
  },
  {
    id: 2,
    title: 'إجمالي الزيارات',
    value: 22019,
    hint: null,
    minus: 0,
    color: '#b9c2cb'
  },
  {
    id: 3,
    title: 'عدد المسجلين',
    value: 100,
    hint: null,
    minus: 0,
    color: '#ef8508'
  },
  {
    id: 4,
    title: 'طالب مكتمل',
    value: 113,
    hint: null,
    minus: 2,
    color: '#00c674'
  },
  {
    id: 5,
    title: 'الربح المتوقع',
    value: '115 ريال',
    hint: 'info',
    minus: 0,
    color: '#009ee0'
  }
]

const Dashboard = (props: PropsType): React.Element<'div'> => (<div className='Affiliate-Dashboard'>
  <DashboardStatistics />
  <GoogleAnalyticsWidget />
  <SearchBar initialValues={{ signup_type: 'all' }} />
  <Registrations />
  <NoSubscribers />
</div>)

export default Dashboard
