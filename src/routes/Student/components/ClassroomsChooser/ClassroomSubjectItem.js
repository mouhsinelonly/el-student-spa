import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'
// import helpers
import { getDayString } from 'utils'
import Loading from 'components/Loading'
import moment from 'moment'

class ClassroomSubjectItem extends Component {
  static propTypes = {
    chosenTimes: PropTypes.array,
    runningactionids: PropTypes.array,
    subject: PropTypes.array,
    exitClassroom: PropTypes.func,
    chooseClassroom: PropTypes.func
  }

  static defaultProps = {
    subject: []
  }

  constructor (props) {
    super(props)
    this._renderClassrooms = this._renderClassrooms.bind(this)
  }
  render () {
    const {subject} = this.props
    if (!subject.length) return false
    const first = subject.find((c, i) => i === 0)
    return (
      <div className='p-a-2'>
        <h5 className='text-xs-center p-t-2 p-b-3'>
          <b>{first.subject.name}</b>
        </h5>
        {this._renderClassrooms()}
      </div>
    )
  }

  _renderClassrooms () {
    const {subject, chooseClassroom, runningactionids, exitClassroom, chosenTimes} = this.props
    return subject.map((s, i) => {
      return <ClassroomItem
        loading={runningactionids.findIndex(r => s.id) > -1}
        chooseClassroom={chooseClassroom}
        chosenTimes={chosenTimes}
        exitClassroom={exitClassroom}
        key={i}
        classroom={s} />
    })
  }

}

class ClassroomItem extends Component {
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
    const {classroom, loading, chosenTimes} = this.props
    const active = (classroom.attendees_limit > classroom.students_count)
    // const timechosen = chosenTimes.findIndex(t => t.day === classroom.day &&
      // t.hour === classroom.hour && t.id !== classroom.id) >= 0

    const classroomStartAtMoment = moment(`2015-10-1${classroom.day} ${classroom.hour}:00`)
    const classroomFinishAtMoment = moment(`2015-10-1${classroom.day} ${classroom.hour}:00`).add(1, 'hour')
//    console.log(chosenTimes)
    const timechosen = chosenTimes.findIndex(t => {
      const chosenStartMoment = moment(`2015-10-1${t.day} ${t.hour}:00`)
      const chosenFinishMoment = moment(`2015-10-1${t.day} ${t.hour}:00`).add(1, 'hour')
      // console.log(chosenStartMoment.isBetween(classroomStartAtMoment, classroomFinishAtMoment))
      // console.log((`2015-10-1${t.day} ${t.hour}:00`))
      return (chosenStartMoment.add(1, 'minute').isBetween(classroomStartAtMoment, classroomFinishAtMoment) ||
      chosenFinishMoment.subtract(1, 'minute').isBetween(classroomStartAtMoment, classroomFinishAtMoment)) &&
      t.id !== classroom.id
    }) >= 0
    // console.log(timechosen, chosenTimes)
    let actionLabel = 'اختيار الشعبة'
    if (classroom.chosen) {
      actionLabel = 'إلغاء الاختيار'
    } else if (active && !timechosen) {
      actionLabel = 'اختيار الشعبة'
    } else if (active && timechosen) {
      actionLabel = 'تعارض في التوقيت'
    } else {
      actionLabel = 'نفذت المقاعد'
    }

    return (<div className={'col-xs-12 col-md-4 col-lg-3'}>
      <article className={`text-xs-center c-classroom-chooser__choice ${active && !timechosen && 'is-active'}
      ${classroom.chosen && 'is-chosen'}`}>
        {loading && <div className='c-classroom-chooser__choice__loading'><Loading /></div>}
        <header className={`c-classroom-chooser__choice__header ${active && !timechosen && 'is-active'}`}>
          <h6 className='c-classroom-chooser__choice__title'>يوم {getDayString(classroom.day)}</h6>
          <span>الساعة {classroom.hour} </span>
          <span className={`${(classroom.hour !== '20:45' && classroom.hour !== '21:50') && 'hidden-xs-up'}`}>
          يتغير في رمضان الى
            {classroom.hour === '20:45' ? ' 21:30 ' : ''}
            {classroom.hour === '21:50' ? '22:35' : ''}
          </span>
          {active && !classroom.chosen && <div className='c-classroom-chooser__choice__remaining p-t-1'>
            {classroom.attendees_limit - classroom.students_count} مقعد متاح
          </div>}
        </header>
        <footer onClick={(!timechosen || classroom.chosen) &&
          (classroom.chosen ? this._exitClassroom : this._chooseClassroom)}
          className={`c-classroom-chooser__choice__footer
            ${((active && !timechosen) || classroom.chosen) && 'is-active'}`}>
          {actionLabel}
        </footer>
      </article>
    </div>)
  }

  _chooseClassroom () {
    const {chooseClassroom, classroom} = this.props
    chooseClassroom(classroom.id)
  }
  _exitClassroom () {
    const {exitClassroom, classroom} = this.props
    exitClassroom(classroom.id)
  }
}

export default ClassroomSubjectItem
