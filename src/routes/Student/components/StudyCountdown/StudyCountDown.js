// @flow
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import './style.scss'
import Icon from 'components/Icon'

type PropsType = {
  className: string
};

export const StudyCountDown = memo((props: PropsType): React.Element<'div'> => {
  const { semester } = useSelector((state: Object): Object => state.student.profile)
  const serverdate = useSelector((state: Object): Object => state.serverdate)
  return semester && moment(semester.start_at).isAfter(serverdate)
  ? <div className={`study-countdown__panel
  ${props.className} text-xs-center m-t-2`}>
    <Icon name='clock-small-success' className='m-l-2' />
  ستنطلق الدراسة
  يوم <b>
    {moment(semester.start_at).format('dddd')}
    {moment(semester.start_at).locale('en-us').format(' D ')}
    {moment(semester.start_at).format('MMMM')}
  </b> ، باقي {moment(semester.start_at).diff(moment(), 'days')} يوم لتتمكن من تصفح المواد
  </div> : <div />
})

export default StudyCountDown
