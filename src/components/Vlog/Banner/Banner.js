// @flow
import * as React from 'react'
import { Link } from 'react-router'
import Trophy from 'components/Svg/Trophy'
import { dayNumberToString, participantNumberToStringWithout } from 'utils'
import './style.scss'

type PropsType = {
  active: Object,
  getVlogs: Function
};

const Banner = (props: PropsType): React.Element<'div'> => {
  React.useEffect(() => {
    props.getVlogs()
  })

  if (props.active === null || typeof props.active.id === 'undefined') return <div />

  const haveVlog = props.active.vlog !== null && typeof props.active.vlog.id !== 'undefined'
  const hasPeriod = props.active !== null
  if (!hasPeriod) {
    return <div />
  }
  return (
    <div className='c-vlog-banner'>
        <div className='col-xs-2 col-md-2 col-lg-1'>
          <Trophy animate width={60} height={60} />
        </div>
        <div className='col-xs-10 col-md-3 col-lg-4 p-r-2'>
          <h4 className='c-vlog-banner__title'>مسابقة الآراء المرئية</h4>
          <span className={`c-vlog-banner__subtitle ${props.active.remaining_days > 0 ? '' : ''}`}>
          </span>
          <span className={`c-vlog-banner__subtitle ${props.active.remaining_days <= 0 ? '' : ''}`}>
            <b>تنتهي المسابقة اليوم</b>
          </span>
        </div>
        <div className='col-xs-12 col-md-3 col-lg-2 text-xs-center c-vlog-banner__total-cont'>
          <div className='c-vlog-banner__total'>
            {props.active.total}
          </div>
          <div className='c-vlog-banner__totalsub'>
            {participantNumberToStringWithout(props.active.total)}
          </div>
        </div>
        <div className='col-xs-12 col-md-3 col-lg-5 text-md-left no-xs-padding c-vlog-banner__footer'>
          <Link to='/student/vlog' className='btn btn-purple-outline c-vlog-banner__btn is-first'>
            تفاصيل المسابقة
          </Link>
          <Link to={haveVlog ? '/student/vlog/edit' : '/student/vlog/submit'}
            className='btn btn-purple-outline font-weight-bold c-vlog-banner__btn'>
            {haveVlog ? 'عرض المشاركة' : 'أرسل المشاركة'}
          </Link>
        </div>
        <div className='clearfix' />
    </div>
  )
}

export default Banner
