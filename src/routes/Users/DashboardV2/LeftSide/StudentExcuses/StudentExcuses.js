// @flow
import * as React from 'react'
import './style.scss'
import { STATUS_STRINGS } from 'utils'
const types = [
  { type: 'sessions', title: 'اللقاءات المباشرة' },
  { type: 'exams', title: 'الاختبارات' }
]
type PropsType = {
  sessions: Array<Object>,
  visibleType: string,
  toggleType: Function
};
class StudentExcuses extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { sessions, visibleType, exams } = this.props
    return (
      <div className='v2-ticket-student-excuses p-b-2'>
        <h1 className='v2-ticket-student-excuses__title is-active p-y-2 p-x-2'>
          الأعذار
          <select className='v2-ticket-student-excuses__type pull-xs-left'
            onChange={this._onTypeChanged} value={visibleType}>
            {types.map((t: Object): React.Element<'option'> =>
              <option key={t.type} value={t.type}>{t.title}</option>)}
          </select>
        </h1>
        <div className='clearfix' />
        <div className={visibleType === 'sessions' ? '' : 'hidden-xs-up'}>
          {sessions.map((e: Object): Object => <SessionExcuseRow
            {...e}
            title={`${e.subject_name} - لقاء ${e.order}`}
            key={e.id} />)}
        </div>
        <div className={visibleType === 'exams' ? '' : 'hidden-xs-up'}>
          {exams.map((e: Object): Object => <SessionExcuseRow {...e}
            title={`${e.subject_name}`}
            key={e.id} />)}
        </div>
      </div>
    )
  }

  _onTypeChanged = (e: Object) => {
    const { toggleType } = this.props
    toggleType(e.target.value)
  }
}

type SessionExcuseRowType = {
  title: string,
  comment: string,
  status: string
};

class SessionExcuseRow extends React.Component<SessionExcuseRowType> {
  render (): React.Element<'div'> {
    const { title, comment, status } = this.props
    let statusClass = ''

    if (status === 'accepted') {
      statusClass = 'text-success'
    } else if (status === 'refused') {
      statusClass = 'text-danger'
    } else {
      statusClass = 'text-info'
    }
    const hasComment = comment || false

    return (<div>
      <div
        data-rh={title}
        data-rh-at='right'
        className='col-xs-5 v2-ticket-student-excuses__item text-nowrap p-b-1'>
        {title}
      </div>
      <div className='col-xs-7'>
        <table width='100%' >
          <tbody>
            <tr>
              <td className={`${statusClass} v2-ticket-student-excuses__info`}>{STATUS_STRINGS[status]}</td>
              <td className='v2-ticket-student-excuses__info'>
                {hasComment ? 'السبب' : '--'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='clearfix' />
      <div className={`v2-ticket-student-excuses__comment p-a-1 font-weight-bold ${!hasComment ? 'hidden-xs-up' : ''}`}>
        {comment}
      </div>
      <div className='clearfix' />
    </div>)
  }
}

export default StudentExcuses
