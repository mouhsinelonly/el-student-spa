// @flow
import * as React from 'react'
import SessionRow from './SessionRow'

type PropsType = {
  subjects: Array<Object>,
  sessions: Array<Object>,
  serverdate: string
};

class SessionsListV2 extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { sessions } = this.props

    return (
      <div className='table-responsive'>
        {sessions.length ? <table className='table p-student-schedule__table m-t-3'>
          <thead>
            <tr>
              <th>المادة</th>
              <th>اللقاء الأول</th>
              <th>اللقاء الثاني</th>
              <th>اللقاء الثالث</th>
              <th>اللقاء الرابع</th>
              <th>اللقاء الخامس</th>
              <th>اللقاء السادس</th>
            </tr>
          </thead>
          <tbody>
            {this._renderSessions()}
          </tbody>
        </table> : <div className='p-a-3 text-xs-center'>لا يوجد لديك فصول افتراضية بعد</div>}
      </div>
    )
  }

  _renderSessions (): Array<typeof SessionRow> {
    const { sessions, serverdate, subjects } = this.props

    return subjects.sort((a: Object, b: Object): number => {
      const aDay = a.class_day !== null ? a.class_day : -1
      const bDay = b.class_day !== null ? b.class_day : -1
      return bDay - aDay
    }).map((s: Object, index: number): React.Element<typeof SessionRow> => {
      const filteredSessions = sessions.filter((session: Object): boolean => session.subject_id === s.id)
      return <SessionRow serverdate={serverdate}
        sessions={filteredSessions}
        subjectName={s.name}
        classroomDay={s.class_day}
        classroomCode={s.class_code}
        classroomHour={s.class_hour}
        key={index} />
    })
  }
}

export default SessionsListV2
