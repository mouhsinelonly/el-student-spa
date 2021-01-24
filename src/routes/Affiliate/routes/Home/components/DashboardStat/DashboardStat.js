// @flow
import React from 'react'
import Loading from 'components/Loading'
import './DashboardStat.scss'

type PropsType = {
  title: string,
  value: string,
  minus: number,
  hint: string,
  loading: boolean,
  color: string
};

const DashboardStat = (props: PropsType): React.Element<'div'> => {
  return <div className='Affiliate-DashboardStat' style={{ borderTopColor: props.color }}>
    {props.loading && <Loading />}
    <div className='Affiliate-DashboardStat__title'>{props.title}
      { props.hint ? <i className={`material-icons ${props.hint} Affiliate-DashboardStat__hint`}>
        {props.hint}
      </i> : null }
    </div>
    <span className='Affiliate-DashboardStat__value'>{props.value}</span>
    { props.minus ? <span className='Affiliate-DashboardStat__minus'>-{props.minus}</span> : null }
  </div>
}

export default DashboardStat
