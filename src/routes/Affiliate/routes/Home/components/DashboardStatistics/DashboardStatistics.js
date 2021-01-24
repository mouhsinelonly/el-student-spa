// @flow
import React from 'react'
import { useSelector } from 'react-redux'
import DashboardStat from '../DashboardStat'

const DashboardStatistics = (props: PropsType): React.Element<'div'> => {
  const { data, loading } = useSelector((state: Object): Object => state.affiliates.stats)

  return <div className='container'>
    <div className='row'>
      <div className='col-md-pull-1 col-xs-12 col-md-2'>
        <DashboardStat
          loading={loading}
          value={!!data && data.todayVisits.value}
          hint={!!data && data.todayVisits.minus < 0 ? 'arrow_drop_up' : 'arrow_drop_down'}
          title='زيارات اليوم' />
      </div>
      <div className='col-md-pull-1 col-xs-12 col-md-2'>
        <DashboardStat
          loading={loading}
          value={!!data && data.totalVisits}
          title='إجمالي الزيارات' />
      </div>
      <div className='col-md-pull-1 col-xs-12 col-md-2'>
        <DashboardStat
          loading={loading}
          color='#ef8508'
          value={!!data && data.totalRegistred}
          title='عدد المسجلين' />
      </div>
      <div className='col-md-pull-1 col-xs-12 col-md-2'>
        <DashboardStat
          loading={loading}
          color='#00c674'
          minus={!!data && data.totalStudents.withdraw}
          value={!!data && data.totalStudents.active}
          title='طالب مكتمل' />
      </div>
      <div className='col-md-pull-1 col-xs-12 col-md-2'>
        <DashboardStat
          loading={loading}
          color='#009ee0'
          hint='info'
          value={!!data && data.totalCredit}
          title='الربح المتوقع' />
      </div>
    </div>
  </div>
}

export default DashboardStatistics
