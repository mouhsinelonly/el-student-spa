// @flow
import * as React from 'react'
import moment from 'moment'
import { dayNumberToString } from 'utils'

type PropsType = {
  name: string,
  start_at: string,
  finish_at: string,
  time_start_at: string
};

class EventRow extends React.Component<PropsType> {
  render (): React.Element<'tr'> {
    const { name, start_at: startAt, finish_at: finishAt, time_start_at: timeStartAt } = this.props
    const startAtMoment = moment(startAt)
    const finishAtMoment = moment(finishAt)
    const diff = finishAtMoment.diff(startAtMoment, 'days') + 1
    return (
      <tr className='c-student-session-row' style={{ fontSize: 14 }} >
        <td>{name}</td>
        <td>{dayNumberToString(diff)}</td>
        <td>{`${startAtMoment.format('dddd')} ${startAt}`} {timeStartAt !== '00:00:00' ? timeStartAt : ''}</td>
        <td>{`${finishAtMoment.format('dddd')} ${finishAt}`}</td>
      </tr>
    )
  }
}

export default EventRow
