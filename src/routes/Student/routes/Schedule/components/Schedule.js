// @flow
import React, { useMemo } from 'react'
import './style.scss'
import EventRow from './EventRow'
import SessionsList from './SessionsListV2'
import TabMenu from './TabMenu'

type PropsType = {
  sessions: Array<Object>,
  events: Array<Object>,
  toggleActiveTab: Function,
  semester: Object,
  activetab: number
};
const Schedule = (props: PropsType): React.Element<'div'> => {
  const { sessions, events, semester, activetab, toggleActiveTab } = props

  const reneredEvents = useMemo((): Array<*> => {
    return events.map((s: Object, index: number): React.Element<typeof EventRow> => <EventRow
      key={index}
      {...s} />)
  }, [events])

  return (<div className='p-student-schedule'>
    <div className='p-student-schedule__header'>
      <h4 className='p-student-schedule__title text-xs-center p-t-3 p-b-2'>الجداول الزمنية {semester.name}</h4>
      <TabMenu active={activetab} setActive={toggleActiveTab} />
    </div>
    <div className='container'>
      <div className='row'>
        <div className={`col-xs-12 col-md-10 col-md-pull-1 ${activetab !== 1 && 'hidden-xs-up'}`}>
          <SessionsList sessions={sessions} />
        </div>
        <div className={`col-xs-12 col-md-8 col-md-pull-2 ${activetab !== 2 && 'hidden-xs-up'}`}>
          <div className='table-responsive'>
            {events.length ? <table className='table p-student-schedule__table m-t-3 m-b-4'>
              <thead>
                <tr>
                  <th>الحدث</th>
                  <th>الفترة</th>
                  <th>من</th>
                  <th>إلى</th>
                </tr>
              </thead>
              <tbody>
                {reneredEvents}
              </tbody>
            </table> : <div className='p-a-3 text-xs-center m-b-3'>لا يوجد لديك فصول افتراضية بعد</div>}
          </div>
        </div>
      </div>
    </div>
  </div>)
}

Schedule.defaultProps = {
  sessions: [],
  events: [],
  activetab: 1
}
export default Schedule
