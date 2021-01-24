// @flow
import * as React from 'react'
import './style.scss'
import Icon from 'components/Icon'
import joyridesConfig from 'utils/joyrides'
import moment from 'moment'

type PropType = {
  className: string,
  serverdate: string,
  semester: Object,
  addStudentJoyride: Function
};

class StudyStarted extends React.Component<PropType> {
  render (): React.Element<'div'> {
    const { className, serverdate, semester } = this.props

    const momentServerTime = moment(serverdate)
    const finishAt = moment(semester.finish_at)

    const studyStartingDate = moment(semester.start_at)

    const studyIsCurrent = studyStartingDate.isBefore(momentServerTime) && finishAt.isAfter(momentServerTime)

    if (!studyIsCurrent) return <div />

    return <div className={`study-started__panel ${className} m-t-2 text-xs-center`}>
      <Icon name='flag-small-success' className='m-l-2' />
  لقد إنطلقت الدراسة، يمكنك الأن تصفح المواد
      <button onClick={this._close} className='study-started__close'>
        <Icon name='times-small' />
      </button>
    </div>
  }

  _close = () => {
    const { addStudentJoyride } = this.props
    addStudentJoyride(joyridesConfig['welcome_semester_message'])
  }
}

export default StudyStarted
