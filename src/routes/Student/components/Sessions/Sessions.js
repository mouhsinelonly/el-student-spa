// @flow
import * as React from 'react'
import LineHeading from 'components/Ui'
import moment from 'moment'
import SessionPlaceHolder from 'components/Placeholders/SessionPlaceHolder'
import SessionBlock from '../SessionBlock'

type PropsType = {
  homepagesessionvisible: boolean,
  homepagesessionpastvisible: boolean,
  homepagesessionlivevisible: boolean,
  showallpastsessions: boolean,
  profile: Object,
  serverdate: string,
  sessions: Array<Object>,
  loadingsessions: boolean,
  showAllPastSessions: Function,
  hideHomePageSession: Function,
  showHomePageSession: Function,
  hideHomePagePastSession: Function,
  showHomePagePastSession: Function,
  hideHomePageLiveSession: Function,
  showHomePageLiveSession: Function
};

class Sessions extends React.Component<PropsType> {
  render (): Array<*> {
    const { homepagesessionvisible,
            homepagesessionpastvisible,
            homepagesessionlivevisible,
            showallpastsessions,
            sessions,
            profile: { state, semester, system_semester_id: systemSemesterId },
            serverdate,
            loadingsessions } = this.props

    const momentServerTime = moment(serverdate)
    const studentIsActive = state === 'active'
    const liveSessions = sessions.filter((s: Object, key: number): boolean => {
      if (!s.classroom_session) return false
      if (s.classroom_session.canceled === 1) return false
      const sessionStartAt = moment(s.classroom_session.start_at)
      return (
        s.classroom_session.canceled === 0 &&
        sessionStartAt.isBefore(momentServerTime) &&
        sessionStartAt
          .clone()
          .add(s.classroom_session.duration, 'minutes')
          .isAfter(momentServerTime)
      )
    })

    const futureSessions = sessions.filter((s: Object, key: number): boolean => {
      if (!s.classroom_session) return false
      if (s.classroom_session.canceled === 1) return false
      const sessionStartAt = moment(s.classroom_session.start_at)
      return s.classroom_session.canceled === 0 && sessionStartAt.isAfter(momentServerTime)
    })

    const pastSessions = sessions.filter((s: Object, key: number): boolean => {
      if (!s.classroom_session) return false
      if (s.classroom_session.canceled === 1) return false
      const sessionStartAt = moment(s.classroom_session.start_at)
      return (
        s.classroom_session.canceled === 0 &&
        sessionStartAt
          .clone()
          .add(s.classroom_session.duration, 'minutes')
          .isBefore(momentServerTime)
      )
    })

    return [
      <LineHeading
        key='1'
        text='اللقاءات المباشرة'
        className={`p-y-2 ${(!loadingsessions || semester.id !== systemSemesterId) ? 'hidden-xs-up' : ''}`}
              />,
      <SessionPlaceHolder
        key='2'
        count={3}
        className={`${(!loadingsessions || !studentIsActive || semester.id !== systemSemesterId)
          ? 'hidden-xs-up' : ''}`}
      />,
      <LineHeading
        key='3'
        text='اللقاءات المباشرة الجارية'
        className={`p-y-2 ${!liveSessions.length ? 'hidden-xs-up' : ''}`}
      >
        <button
          onClick={homepagesessionlivevisible ? this._hideLiveSession : this._showLiveSession}
          className='btn btn-secondary btn-curved p-y-0 btn-md'
        >
          {homepagesessionlivevisible ? 'إخفاء' : `إظهار (${liveSessions.length}+)`}
        </button>
      </LineHeading>,
      (studentIsActive &&
        homepagesessionlivevisible)
        ? liveSessions.map((s: Object, i: number): React.Element<typeof SessionBlock> =>
          <SessionBlock index={i} key={i} {...s} />) : null,
      <LineHeading
        key='5'
        text='اللقاءات المباشرة القادمة'
        className={`p-y-2 ${!futureSessions.length ? 'hidden-xs-up' : ''}`}
      >
        <button
          onClick={homepagesessionvisible ? this._hideSession : this._showSession}
          className='btn btn-secondary btn-curved p-y-0 btn-md'
        >
          {homepagesessionvisible ? 'إخفاء' : `إظهار (4+)`}
        </button>
      </LineHeading>,
      (studentIsActive &&
        homepagesessionvisible)
        ? futureSessions.filter((s: Object, i: number): boolean => i < 4)
        .map((s: Object, i: number): React.Element<typeof SessionBlock> =>
          <SessionBlock index={i} key={i} {...s} />) : null,
      <LineHeading
        key='6'
        text='اللقاءات المباشرة المنصرمة'
        className={`p-y-2 ${!pastSessions.length ? 'hidden-xs-up' : ''}`}
      >
        <button
          onClick={homepagesessionpastvisible ? this._hidePastSession : this._showPastSession}
          className='btn btn-secondary btn-curved p-y-0 btn-md'
        >
          {homepagesessionpastvisible ? 'إخفاء' : `إظهار (${pastSessions.length}+)`}
        </button>
      </LineHeading>,
      (studentIsActive &&
        homepagesessionpastvisible)
        ? pastSessions
          .reverse()
          .map((s: Object, i: number): React.Element<typeof SessionBlock> =>
            (i < 4 || showallpastsessions ? <SessionBlock
              index={i}
              attendedInOther={sessions.findIndex((o: Object): boolean =>
              o.subject_id === s.subject_id &&
              o.order === s.order &&
              (o.attended === 1 || ((o.excuseStatus !== 'refused') && o.excuseStatus !== null)) &&
              o.id !== s.id) >= 0}
              key={i}
              {...s} /> : null)) : null,
      <a
        key='7'
        className={`text student-dashboard__more-sessions p-a-2 text-xs-left
        ${(showallpastsessions || !homepagesessionpastvisible || pastSessions.length < 5)
        ? 'hidden-xs-up'
        : ''}`} onClick={this._showAllPastSessions}>
                إظهار كل اللقاءات المنصرمة +
      </a>
    ]
  }
  _showAllPastSessions = () => {
    const { showAllPastSessions } = this.props
    showAllPastSessions()
  }
  _hideSession = () => {
    const { hideHomePageSession } = this.props
    hideHomePageSession()
  }
  _showSession = () => {
    const { showHomePageSession } = this.props
    showHomePageSession()
  }
  _hidePastSession = () => {
    const { hideHomePagePastSession } = this.props
    hideHomePagePastSession()
  }
  _showPastSession = () => {
    const { showHomePagePastSession } = this.props
    showHomePagePastSession()
  }
  _hideLiveSession = () => {
    const { hideHomePageLiveSession } = this.props
    hideHomePageLiveSession()
  }
  _showLiveSession = () => {
    const { showHomePageLiveSession } = this.props
    showHomePageLiveSession()
  }
}

export default Sessions
