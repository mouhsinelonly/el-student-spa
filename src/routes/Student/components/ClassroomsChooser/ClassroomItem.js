import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getDayString } from 'utils'
import Loading from 'components/Loading'

class ClassroomItem extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    chosenTimes: PropTypes.array,
    classroom: PropTypes.object,
    exitClassroom: PropTypes.func,
    chooseClassroom: PropTypes.func
  }
  static defaultProps = {
    loading: false
  }
  constructor (props) {
    super(props)

    this._chooseClassroom = this._chooseClassroom.bind(this)
    this._exitClassroom = this._exitClassroom.bind(this)
  }
  render () {
    const { classroom, loading, chosenTimes } = this.props
    const active = (classroom.attendees_limit > classroom.students_count)
    
    const classroomStartAtMoment = moment(`2015-10-1${classroom.day} ${classroom.hour}`)
    const classroomFinishAtMoment = moment(`2015-10-1${classroom.day} ${classroom.hour}`).add(1, 'hour')
    const timechosen = chosenTimes.findIndex(t => {
      const chosenStartMoment = moment(`2015-10-1${t.day} ${t.hour}`)
      const chosenFinishMoment = moment(`2015-10-1${t.day} ${t.hour}`).add(1, 'hour')

      return (chosenStartMoment.add(1, 'minute').isBetween(classroomStartAtMoment, classroomFinishAtMoment) ||
      chosenFinishMoment.subtract(1, 'minute').isBetween(classroomStartAtMoment, classroomFinishAtMoment)) &&
      t.id !== classroom.id
    }) >= 0
    let canChoose = false
    let actionLabel = 'حجز التوقيت'

    if (classroom.disabled && classroom.chosen) {
      canChoose = false
      actionLabel = 'التعديل معطل'
    } else if (classroom.disabled && !classroom.chosen) {
      canChoose = false
      actionLabel = 'الاختيار معطل'
    } else if (classroom.chosen) {
      canChoose = true
      actionLabel = 'إلغاء الحجز'
    } else if (active && !timechosen) {
      canChoose = true
      actionLabel = 'حجز التوقيت'
    } else if (active && timechosen) {
      canChoose = false
      actionLabel = 'محدد في مادة أخرى'
    } else {
      canChoose = false
      actionLabel = 'نفذت المقاعد'
    }

    return (<div className={'col-xs-12 col-md-4 col-lg-3'}>
      <article className={`text-xs-center c-classroom-chooser__choice
      ${active && !timechosen && 'is-active'}
      ${classroom.chosen && 'is-chosen'}
      ${classroom.disabled ? 'is-disabled' : ''}`}>
        {loading && <div className='c-classroom-chooser__choice__loading'><Loading /></div>}
        <header className={`c-classroom-chooser__choice__header
          ${active && !timechosen && 'is-active'}
          ${classroom.disabled ? 'is-disabled' : ''}`}>
          <h6 className='c-classroom-chooser__choice__title'>يوم {getDayString(classroom.day)}</h6>
          <span>الساعة {classroom.hour} </span>
          <div className={`${!classroom.comment ? 'hidden-xs-up' : ''}`}>
            <u style={{ fontSize: 15 }} className='font-weight-bold text-warning'>{classroom.comment}</u>
          </div>
          {active && !timechosen && !classroom.chosen && <div className='c-classroom-chooser__choice__remaining p-t-1'>
            {classroom.attendees_limit - classroom.students_count} مقعد متاح
          </div>}
        </header>
        <footer onClick={((!timechosen || classroom.chosen) &&
           canChoose) && !classroom.disabled
        ? (classroom.chosen ? this._exitClassroom : this._chooseClassroom)
        : () => {}}
          className={`c-classroom-chooser__choice__footer
            ${((active && !timechosen) || classroom.chosen) && 'is-active'}
            ${classroom.disabled ? 'is-disabled' : ''}`}>
          {actionLabel}
        </footer>
      </article>
    </div>)
  }

  _chooseClassroom () {
    const { chooseClassroom, classroom } = this.props
    chooseClassroom(classroom.id)
  }
  _exitClassroom () {
    const { exitClassroom, classroom } = this.props
    exitClassroom(classroom.id)
  }
}

export default ClassroomItem
