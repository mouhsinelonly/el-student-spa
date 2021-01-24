// @flow
import * as React from 'react'
import SessionRow from '../SessionRow'

type PropsType = {
  sessions: Array<Object>,
  serverdate: string
};
class SessionsList extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { sessions } = this.props

    return (
      <div className=' table-responsive'>
        {sessions.length ? <table className='table p-student-schedule__table m-t-3'>
          <tbody>
            {this._renderSessions()}
          </tbody>
        </table> : <div className='p-a-3 text-xs-center'>لا يوجد لديك فصول افتراضية بعد</div>}
      </div>
    )
  }

  _renderSessions (): Array<typeof SessionRow> {
    const { sessions, serverdate } = this.props
    return sessions.map((s: Object, index: number): React.Element<typeof SessionRow> => <SessionRow
      key={index}
      serverdate={serverdate}
      {...s} />)
  }
}

export default SessionsList
