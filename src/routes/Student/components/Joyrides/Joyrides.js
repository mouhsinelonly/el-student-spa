// @flow
import * as React from 'react'
import moment from 'moment'
import StudyCountdown from '../StudyCountdown'
import JoyrideMessage from '../JoyrideMessage'
import Icon from 'components/Icon'
import { dayNumberToString, isEvent } from 'utils'

type PropsType = {
  joyrides: Array<Object>,
  serverdate: string,
  semester: Object,
  events: Array<Object>,
  handleClose: Function,
  studentActive: boolean
};

const Joyrides = ({ joyrides, serverdate, semester, studentActive, handleClose, events }: PropsType): Array<*> => {
  const studyStartingDate = moment(semester.start_at)
  let SubjectForumStarted
  let SubjectForumEnding
  let SubjectForumGraded
  const momentServerTime = moment(serverdate)

  const semesterFinishAtMoment = moment(semester.finish_at)

  const studyIsCurrent = studyStartingDate.isBefore(momentServerTime) &&
    semesterFinishAtMoment.isAfter(momentServerTime)

  const StudyStartedJoyride = studentActive && studyIsCurrent ? <JoyrideMessage onClose={handleClose} joyrides={joyrides}
    key='1'
    render={(): * => [<Icon name='flag-small-success' className='m-l-2' key='icon' />,
      'لقد إنطلقت الدراسة، يمكنك الأن تصفح المواد']}
    slug='welcome_semester_message' /> : null
  const forumStartedEvent = isEvent(events, 'subject_forum', 'isFirstDay')
  if (forumStartedEvent) {
    SubjectForumStarted = <JoyrideMessage onClose={handleClose} joyrides={joyrides}
      key='2'
      render={(): * => <>
        <i className='material-icons is-inline m-l-1 text-success' key='icon'>chat</i>
          بدأت فترت كتابة واجب المنتدى لكل مادة، لمدة {dayNumberToString(forumStartedEvent.durationInDays)}
      </>} slug='student_forum_started' />
  }
  if (isEvent(events, 'subject_forum', 'isLastDay')) {
    SubjectForumEnding = <JoyrideMessage onClose={handleClose} joyrides={joyrides}
      key='3'
      render={(): * => <>
        <i className='material-icons is-inline m-l-1 text-info' key='icon'>sms_failed</i>
          اليوم آخر موعد لتسليم واجب المنتدى
      </>} slug='student_forum_ending' />
  }
  if (isEvent(events, 'subject_forum_results', 'isCurrent')) {
    SubjectForumGraded = <JoyrideMessage onClose={handleClose} joyrides={joyrides}
      key='4'
      render={(): * => <>
        <i className='material-icons is-inline m-l-1 text-success' key='icon'>check</i>
          تم إعلان نتائج المنتدى، ستجدها في صفحة المنتدى بالمادة
      </>} slug='student_forum_graded' />
  }
  return [<StudyCountdown className='p-a-1 m-b-1' key='0' />,
    StudyStartedJoyride || null,
    SubjectForumStarted || null,
    SubjectForumEnding || null,
    SubjectForumGraded || null]
}

export default Joyrides
