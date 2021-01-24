// @flow
import * as React from 'react'
import Trophy from 'components/Svg/Trophy'
import { participantNumberToStringWithout } from 'utils'
import './style.scss'

type PropsType = {
  total: number,
  remaining: number
};

const Header = (props: PropsType): React.Element<'div'> => {
  return (
    <div className='text-xs-center c-vlog-Header m-t-3'>
      <Trophy />
      <h1 className='c-vlog-Header__title p-y-1'>مسابقة الآراء المرئية</h1>
      <span className='c-vlog-Header__desc'>يسر مركز التعليم عن بعد أن يعلن عن مسابقة الآراء المرئية الأولى</span>
      <div className='c-vlog-Header__stats row p-y-2 m-t-3'>
        <div className='col-xs-6'>
          <div className='c-vlog-Header__stats-big'>{props.total}</div>
          <small className='c-vlog-Header__stats-small'>
            {participantNumberToStringWithout(props.total)}
          </small>
        </div>
        <div className='col-xs-6'>
          <div className='c-vlog-Header__stats-big is-second'>{props.remaining}</div>
          <small className='c-vlog-Header__stats-small is-second'>أيام متبقية</small>
        </div>
      </div>
    </div>
  )
}

Header.defaultProps = {
  total: 0,
  remaining: 0
}

export default Header
