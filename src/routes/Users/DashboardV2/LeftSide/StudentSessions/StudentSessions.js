// @flow
import * as React from 'react'
import './style.scss'
import moment from 'moment'

const sessionsNum = [1, 2, 3, 4, 5]
type PropsType = {
  subjects: Array<Object>
};
class StudentSessions extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { subjects } = this.props

    return (
      <div className='v2-ticket-student-sessions p-b-2'>
        <div className='v2-ticket-student-subjects__title is-active p-y-2 p-x-2'>اللقاءات المباشرة</div>
        {subjects.map((s: Object): React.Element<typeof StudentSessionSubject> =>
          <StudentSessionSubject {...s} key={s.id} />)}
      </div>
    )
  }
}

type ItemType = {
  name: string,
  sessions: Array<Object>
};

class StudentSessionSubject extends React.Component<ItemType> {
  render (): React.Element<'div'> {
    const { name, sessions } = this.props

    return (<div className='v2-ticket-student-sessions__item p-t-1'>
      <div className='col-xs-5'>
        <div data-rh={name}
          data-rh-at='right'
          className='v2-ticket-student-sessions__item-title text-nowrap'>{ name }</div>
      </div>
      <div className='col-xs-7'>
        <table className={`v2-ticket-student-sessions__item-table ${sessions.length ? '' : 'hidden-xs-up'}`}>
          <tbody>
            <tr>
              {sessionsNum.map((order: number): React.Element<typeof StudentSessionItem> =>
                <StudentSessionItem
                  key={order}
                  sessions={sessions}
                  order={order} />)}
            </tr>
          </tbody>
        </table>
        <div className={`${!sessions.length ? '' : 'hidden-xs-up'}`}>لم يختر الوقت بعد</div>
      </div>
      <div className='clearfix' />
    </div>)
  }
}

type SessionType = {
  sessions: Array<Object>,
  order: number
};

class StudentSessionItem extends React.Component<SessionType> {
  render (): React.Element<'td'> {
    const { order, sessions } = this.props
    let startAt
    const attended = sessions.findIndex((s: Object): boolean => s.order === order && s.attended === 1) >= 0
    const session = sessions.find((s: Object): boolean => s.order === order)
    if (session) {
      startAt = moment(session.start_at)
    }

    let stateClass = ''
    let iconName = ''
    if (attended && (startAt && startAt.isBefore(moment()))) {
      stateClass = 'is-success'
      iconName = 'check'
    } else if (!attended && (startAt && startAt.isBefore(moment()))) {
      stateClass = 'is-danger'
      iconName = 'close'
    } else if (session) {
      stateClass = 'is-warning'
      iconName = 'access_time'
    }
    const startFormat = startAt ? `${startAt.locale('en-us').format('D')}
    ${startAt.locale('ar-SA').format(' MMMM ')}
    | ${startAt.locale('en-us').format(' h:mm ')}
    ${startAt.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}` : ''
    return (<td>
      <button data-rh={startFormat}
        data-rh-at='right'
        className={`v2-ticket-student-sessions__item-button ${stateClass}`} >
        <span className='material-icons'>
          {iconName}
        </span>
      </button>
    </td>)
  }
}

export default StudentSessions
